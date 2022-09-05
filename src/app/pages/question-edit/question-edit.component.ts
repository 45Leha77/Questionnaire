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
  SingleQuestionFormArray,
  MultipleQuestionFormArray,
  SingleQuestionCard,
  MultipleQuestionCard,
} from 'src/app/core/models/interfaces';
import { LocalStorageService } from 'src/app/core/services/localStorage.service';
import { UnsubscribeService } from 'src/app/core/services/unsubscribe.service';
import { cardFactory } from 'src/app/core/factories/card';

@Component({
  selector: 'app-question-edit',
  templateUrl: './question-edit.component.html',
  styleUrls: ['./question-edit.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [UnsubscribeService],
})
export class QuestionEditComponent implements OnInit {
  public questionType: CardType | undefined = undefined;
  public card: QuestionCard = {} as QuestionCard;
  public isValidAnswers: boolean = true;
  public form: FormGroup = this.fb.group({
    question: ['', Validators.required],
    singles: this.fb.array([]),
    multiples: this.fb.array([]),
    open: this.fb.array([]),
  });
  public cardType: typeof CardType = CardType;
  private factory = cardFactory;
  constructor(
    private readonly localStorage: LocalStorageService,
    private readonly router: Router,
    private readonly route: ActivatedRoute,
    private readonly fb: FormBuilder,
    private readonly unsubscribe: UnsubscribeService
  ) {}

  ngOnInit(): void {
    this.route.queryParamMap
      .pipe(
        map((param: ParamMap) => param.get('id')),
        filter((id) => !!id),
        tap((id) => {
          const card: QuestionCard | null = this.localStorage.getCardById(
            +(id as string)
          );
          if (!!card) {
            this.card = this.factory.createCard(card);
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
    this.createNewCardIfTypeChanged();
    this.card.updateCardByForm(this.form);
    this.localStorage.saveEdit(this.card);
    this.router.navigateByUrl('/manage');
  }

  public addAnswer(type: CardType): void {
    if (type === this.cardType.single) {
      this.addSingleAnswer();
    }

    if (type === this.cardType.multiple) {
      this.addMultipleAnswer();
    }

    if (type === this.cardType.open) {
      this.addOpenAnswer();
    }
    this.isValidAnswers = this.isEnoughAnswers(type);
  }

  public onUndo(): void {
    this.clearAnswers();
    this.updateForm();
  }

  public onChange(type: CardType): void {
    this.clearAnswers();
    this.questionType = type;
    this.card?.type === type ? this.updateForm() : this.addAnswer(type);
    this.isValidAnswers = this.isEnoughAnswers(type);
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
      (this.card as SingleQuestionCard).single.forEach((single: Answer) => {
        this.addSingleAnswer(single);
      });
    }
    if (this.card.type === this.cardType.multiple) {
      (this.card as MultipleQuestionCard).multiple.forEach(
        (multiple: Answer) => {
          this.addMultipleAnswer(multiple);
        }
      );
    }
  }

  private clearAnswers(): void {
    this.singles.clear();
    this.multiples.clear();
    this.open.clear();
  }

  private createNewCardIfTypeChanged() {
    if (this.card.type !== this.questionType) {
      this.card.type = this.questionType;
      this.card = this.factory.createCard(this.card);
    }
  }

  private isEnoughAnswers(type: CardType | undefined): boolean {
    const _minAnswersNumber: number = 2;
    if (!type) {
      return false;
    }
    if (type === this.cardType.single) {
      return this.singles.length >= _minAnswersNumber;
    }
    if (type === this.cardType.multiple) {
      return this.multiples.length >= _minAnswersNumber;
    }
    return true;
  }
}
