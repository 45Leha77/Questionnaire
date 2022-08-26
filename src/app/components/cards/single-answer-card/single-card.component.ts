import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  OnInit,
  Output,
} from '@angular/core';
import { FormGroup, FormArray, FormBuilder } from '@angular/forms';
import { takeUntil, tap } from 'rxjs';

import { validateRadioButton } from 'src/app/models/custom-validators';
import { QuestionCard, CardValidator, Answer } from 'src/app/models/interfaces';
import { UnsubscribeService } from 'src/app/services/unsubscribe.service';
import { Required } from 'src/app/shared/decorators/required.decorator';

@Component({
  selector: 'app-single-card',
  templateUrl: './single-card.component.html',
  styleUrls: ['./single-card.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [UnsubscribeService],
})
export class SingleCardComponent implements OnInit {
  @Input() @Required public card!: QuestionCard;
  @Input() public mode: string = 'list';
  @Output() public change = new EventEmitter<CardValidator>();

  public form: FormGroup = this.fb.group({
    answers: this.fb.array([], validateRadioButton),
  });

  constructor(
    private fb: FormBuilder,
    private unsubscribe: UnsubscribeService
  ) {}

  ngOnInit(): void {
    this.card.single.forEach((answer, index) => {
      this.addAnswer(answer, index);
    });
    this.observeForm();
  }

  get answers(): FormArray<any> {
    return this.form.get('answers') as FormArray;
  }

  private observeForm(): void {
    this.form.valueChanges
      .pipe(
        tap((value) => {
          if (this.card.singleValue || this.card.singleValue === 0) {
            value.answers[this.card.singleValue].radio = false;
          }
          value.answers.forEach((el: any, index: number) => {
            if (el.radio) {
              this.card.singleValue = index;
            }
          });

          this.change.emit({ isValid: this.form.valid, id: this.card.id });
        }),
        takeUntil(this.unsubscribe.destroy$)
      )
      .subscribe();
  }

  private addAnswer(answer: Answer, index: number): void {
    if (this.mode === 'manage') {
      this.answers.push(
        this.fb.group({
          text: answer.value,
          radio: { value: '', disabled: true },
        })
      );
    }

    if (this.mode === 'list') {
      if (this.card.answered) {
        let value: boolean = false;
        if (this.card.singleValue === index) {
          value = true;
        }
        this.answers.push(
          this.fb.group({
            text: answer.value,
            radio: { value: value, disabled: true },
          })
        );
      } else {
        this.answers.push(
          this.fb.group({
            text: answer.value,
            radio: [false],
          })
        );
      }
    }
  }
}
