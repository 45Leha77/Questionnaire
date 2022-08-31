import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  OnInit,
  Output,
} from '@angular/core';
import { FormGroup, FormArray, FormBuilder } from '@angular/forms';
import { filter, takeUntil, tap } from 'rxjs';

import { validateCheckBox } from 'src/app/core/validators/custom-validators';
import {
  QuestionCard,
  CardValidator,
  Answer,
  AnswerCheckboxFormValue,
} from 'src/app/core/models/interfaces';
import { UnsubscribeService } from 'src/app/core/services/unsubscribe.service';
import { Required } from 'src/app/shared/decorators/required.decorator';

@Component({
  selector: 'app-multiple-card',
  templateUrl: './multiple-card.component.html',
  styleUrls: ['./multiple-card.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [UnsubscribeService],
})
export class MultipleCardComponent implements OnInit {
  @Input() @Required public card!: QuestionCard;
  @Input() public mode: string = 'list';
  @Output() public change: EventEmitter<CardValidator> =
    new EventEmitter<CardValidator>();

  public form: FormGroup = this.fb.group({
    answers: this.fb.array([], validateCheckBox),
  });

  constructor(
    private fb: FormBuilder,
    private unsubscribe: UnsubscribeService
  ) {}

  ngOnInit(): void {
    this.card.multiple.forEach((answer, index) => {
      this.addAnswer(answer, index);
    });
    this.observeForm();
  }
  get answers(): FormArray {
    return this.form.get('answers') as FormArray;
  }

  private observeForm(): void {
    this.form.valueChanges
      .pipe(
        filter(() => !!this.card),
        tap((value) => {
          const list: number[] = value.answers.map(
            (el: AnswerCheckboxFormValue, index: number): number => {
              return el.inp ? index : -1;
            }
          );
          list.length ? (this.card.multipleValue = list) : null;
          this.change.emit({ isValid: this.form.valid, id: this.card.id });
        }),
        takeUntil(this.unsubscribe.destroy$)
      )
      .subscribe();
  }

  private addAnswer(answer: Answer, index: number): void {
    let inp: object | [] = { value: '', disabled: true };
    if (this.mode === 'list') {
      if (this.card.isAnswered) {
        inp = {
          value: this.card.multipleValue?.indexOf(index) != -1,
          disabled: true,
        };
      } else {
        inp = [false];
      }
    }
    this.answers.push(this.fb.group({ text: answer.value, inp }));
  }
}
