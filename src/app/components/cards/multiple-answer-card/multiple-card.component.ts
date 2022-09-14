import {
  ChangeDetectionStrategy,
  Component,
  Input,
  OnInit,
} from '@angular/core';
import { FormGroup, FormArray } from '@angular/forms';
import { filter, takeUntil, tap } from 'rxjs';

import { validateCheckBox } from 'src/app/core/validators/custom-validators';
import {
  Answer,
  AnswerCheckboxFormValue,
  MultipleQuestionCard,
  MultipleQuestionFormArray,
} from 'src/app/core/models/interfaces';
import { UnsubscribeService } from 'src/app/core/services/unsubscribe.service';
import { Required } from 'src/app/shared/decorators/required.decorator';
import { PageMode } from 'src/app/core/enums/page-mode';
import { CardBase } from '../card-base';

@Component({
  selector: 'app-multiple-card',
  templateUrl: './multiple-card.component.html',
  styleUrls: ['./multiple-card.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [UnsubscribeService],
})
export class MultipleCardComponent extends CardBase implements OnInit {
  @Input() @Required public card!: MultipleQuestionCard;
  constructor(private unsubscribe: UnsubscribeService) {
    super();
  }

  ngOnInit(): void {
    this.card.multiple.forEach((answer, index) => {
      this.addAnswer(answer, index);
    });
    this.form.controls.answers.addValidators(validateCheckBox);
    this.observeForm();
  }
  get answers(): FormArray<
    FormGroup<MultipleQuestionFormArray<string, object>>
  > {
    return this.form.get('answers') as FormArray;
  }

  private observeForm(): void {
    this.form.valueChanges
      .pipe(
        filter(() => !!this.card),
        tap((value) => {
          const list: number[] = value.answers.map(
            (el: AnswerCheckboxFormValue, index: number): number => {
              return el.input ? index : -1;
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
    let input: object | [] = { value: '', disabled: true };
    if (this.mode === PageMode.list) {
      if (this.card.isAnswered) {
        input = {
          value: this.card.multipleValue?.indexOf(index) != -1,
          disabled: true,
        };
      } else {
        input = [false];
      }
    }
    this.answers.push(this.fb.group({ text: answer.value, input }));
  }
}
