import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import {
  FormArray,
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { filter, map, takeUntil, tap } from 'rxjs';
import { CardType } from 'src/app/core/enums/card-type';

import {
  QuestionCard,
  Answer,
  QuestionsTypes,
  SingleQuestionFormArray,
  MultipleQuestionFormArray,
} from 'src/app/core/models/interfaces';
import { LocalStorageService } from 'src/app/core/services/localStorage.service';
import { CardFormatterService } from 'src/app/core/services/cardFormatter.service';
import { UnsubscribeService } from 'src/app/core/services/unsubscribe.service';

@Component({
  selector: 'app-question-edit',
  templateUrl: './question-edit.component.html',
  styleUrls: ['./question-edit.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [UnsubscribeService],
})
export class QuestionEditComponent implements OnInit {
  public questionType: QuestionsTypes | undefined = undefined;
  public card: QuestionCard | null = null;
  public form: FormGroup = this.fb.group({
    question: ['', Validators.required],
    singles: this.fb.array([]),
    multiples: this.fb.array([]),
    open: this.fb.array([]),
  });
  private cardType: typeof CardType = CardType;
  constructor(
    private readonly localStorage: LocalStorageService,
    private readonly router: Router,
    private readonly route: ActivatedRoute,
    private readonly fb: FormBuilder,
    private readonly unsubscribe: UnsubscribeService,
    private readonly cardFormatter: CardFormatterService
  ) {}

  ngOnInit(): void {
    this.route.queryParamMap
      .pipe(
        map((param: ParamMap) => param.get('id')),
        filter((id) => !!id),
        tap((id) => {
          this.card = this.localStorage.getCardById(+id!);
          if (!!this.card) {
            this.questionType = this.card.type;
            this.updateForm();
          }
        }),
        takeUntil(this.unsubscribe.destroy$)
      )
      .subscribe();
  }

  get singles(): FormArray<FormGroup<SingleQuestionFormArray>> {
    return this.form.get('singles') as FormArray;
  }

  get multiples(): FormArray<FormGroup<MultipleQuestionFormArray>> {
    return this.form.get('multiples') as FormArray;
  }

  get open(): FormArray<FormControl<string | null>> {
    return this.form.get('open') as FormArray;
  }

  public onEdit(): void {
    if (!this.card) {
      return;
    }
    this.card = {
      ...this.card,
      type: this.questionType,
      isOpen: this.questionType === this.cardType.open,
    };
    this.card = this.cardFormatter.updateCardByForm(this.card, this.form);
    this.localStorage.saveEdit(this.card);
    this.router.navigateByUrl('/manage');
  }

  public addAnswer(type: QuestionsTypes): void {
    if (type === this.cardType.single) {
      this.addSingleAnswer();
    }

    if (type === this.cardType.multiple) {
      this.addMultipleAnswer();
    }

    if (type === this.cardType.open) {
      this.addOpenAnswer();
    }
  }

  public onUndo(): void {
    this.clearAnswers();
    this.updateForm();
  }

  public onChange(type: QuestionsTypes): void {
    this.clearAnswers();
    this.questionType = type;
    this.card?.type === type ? this.updateForm() : this.addAnswer(type);
  }

  private addSingleAnswer(answer?: Answer): void {
    const singleAnswerForm: FormGroup = this.fb.group({
      text: [answer ? answer.value : '', Validators.required],
      radio: { value: '', disabled: true },
    });
    this.singles.push(singleAnswerForm);
  }

  private addMultipleAnswer(answer?: Answer): void {
    const multipleAnswerForm: FormGroup = this.fb.group({
      text: [answer ? answer.value : '', Validators.required],
      input: { value: '', disabled: true },
    });
    this.multiples.push(multipleAnswerForm);
  }

  private addOpenAnswer(): void {
    this.open.push(this.fb.control({ value: '', disabled: true }));
  }

  private updateForm(): void {
    if (!this.card) {
      return;
    }
    this.form.patchValue({ question: this.card.question });
    if (this.card.type === this.cardType.open) {
      this.addOpenAnswer();
    }
    if (this.card.type === this.cardType.single) {
      this.card.single.forEach((single: Answer) => {
        this.addSingleAnswer(single);
      });
    }
    if (this.card.type === this.cardType.multiple) {
      this.card.multiple.forEach((multiple: Answer) => {
        this.addMultipleAnswer(multiple);
      });
    }
  }

  private clearAnswers(): void {
    this.singles.clear();
    this.multiples.clear();
    this.open.clear();
  }
}
