import {
  ChangeDetectionStrategy,
  Component,
  Input,
  OnInit,
} from '@angular/core';
import { FormArray, FormControl, Validators } from '@angular/forms';
import { OpenQuestionCard } from 'src/app/core/models/interfaces';
import { UnsubscribeService } from 'src/app/core/services/unsubscribe.service';
import { takeUntil, tap } from 'rxjs';
import { PageMode } from 'src/app/core/enums/page-mode';
import { CardBase } from '../card-base';
import { Required } from 'src/app/shared/decorators/required.decorator';

@Component({
  selector: 'app-open-card',
  templateUrl: './open-card.component.html',
  styleUrls: ['./open-card.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [UnsubscribeService],
})
export class OpenCardComponent extends CardBase implements OnInit {
  @Input() @Required public card!: OpenQuestionCard;

  constructor(private unsubscribe: UnsubscribeService) {
    super();
  }

  ngOnInit(): void {
    this.addAnswer();
    this.observeForm();
  }

  get answers(): FormArray<FormControl<string | null>> {
    return this.form.get('answers') as FormArray;
  }

  private observeForm(): void {
    this.form.valueChanges
      .pipe(
        tap((value) => {
          this.card.openAnswerValue = value.answers[0];
          this.change.emit({ isValid: this.form.valid, id: this.card.id });
        }),
        takeUntil(this.unsubscribe.destroy$)
      )
      .subscribe();
  }

  private addAnswer(): void {
    if (this.mode === PageMode.list) {
      return this.card.isAnswered
        ? this.answers.push(
            this.fb.control({
              value: this.card.openAnswerValue as string,
              disabled: true,
            })
          )
        : this.answers.push(
            this.fb.control('', [
              Validators.required,
              Validators.maxLength(255),
            ])
          );
    }
    return this.answers.push(this.fb.control({ value: '', disabled: true }));
  }
}
