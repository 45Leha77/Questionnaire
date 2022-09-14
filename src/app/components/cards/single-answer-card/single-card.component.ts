import {
  ChangeDetectionStrategy,
  Component,
  Input,
  OnInit,
} from '@angular/core';
import { FormGroup, FormArray } from '@angular/forms';
import { takeUntil, tap } from 'rxjs';

import { validateRadioButton } from 'src/app/core/validators/custom-validators';
import {
  Answer,
  SingleQuestionCard,
  SingleQuestionFormArray,
} from 'src/app/core/models/interfaces';
import { UnsubscribeService } from 'src/app/core/services/unsubscribe.service';
import { PageMode } from 'src/app/core/enums/page-mode';
import { CardBase } from '../card-base';
import { Required } from 'src/app/shared/decorators/required.decorator';

@Component({
  selector: 'app-single-card',
  templateUrl: './single-card.component.html',
  styleUrls: ['./single-card.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [UnsubscribeService],
})
export class SingleCardComponent extends CardBase implements OnInit {
  @Input() @Required public card!: SingleQuestionCard;

  constructor(private unsubscribe: UnsubscribeService) {
    super();
  }

  ngOnInit(): void {
    this.card.single.forEach((answer, index) => {
      this.addAnswer(answer, index);
    });
    this.form.controls.answers.addValidators(validateRadioButton);
    this.observeForm();
  }

  get answers(): FormArray<FormGroup<SingleQuestionFormArray<string, object>>> {
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
    let radio: object | [] = { value: '', disabled: true };
    if (this.mode === PageMode.list) {
      if (this.card.isAnswered) {
        const value = this.card.singleValue === index;
        radio = { value: value, disabled: true };
      } else {
        radio = [false];
      }
    }
    this.answers.push(this.fb.group({ text: answer.value, radio }));
  }
}
