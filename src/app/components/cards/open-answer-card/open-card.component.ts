import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  OnInit,
  Output,
} from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import {
  CardValidator,
  OpenQuestionCard,
} from 'src/app/core/models/interfaces';
import { UnsubscribeService } from 'src/app/core/services/unsubscribe.service';
import { takeUntil, tap } from 'rxjs';
import { Required } from 'src/app/shared/decorators/required.decorator';

@Component({
  selector: 'app-open-card',
  templateUrl: './open-card.component.html',
  styleUrls: ['./open-card.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [UnsubscribeService],
})
export class OpenCardComponent implements OnInit {
  @Input() @Required public card!: OpenQuestionCard;
  @Input() public mode: string = 'list';
  @Output() public change = new EventEmitter<CardValidator>();

  public form: FormGroup = this.fb.group({
    answers: this.fb.array([]),
  });

  constructor(
    private fb: FormBuilder,
    private unsubscribe: UnsubscribeService
  ) {}

  ngOnInit(): void {
    this.addAnswer();
    this.observeForm();
  }

  get answers(): FormArray<any> {
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
    if (this.mode === 'list') {
      return this.card.isAnswered
        ? this.answers.push(
            this.fb.control({
              value: this.card.openAnswerValue,
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
