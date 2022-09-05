import { ChangeDetectionStrategy, Component } from '@angular/core';
import {
  FormArray,
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { Router } from '@angular/router';
import { CardType } from 'src/app/core/enums/card-type';
import {
  MultipleQuestionFormArray,
  QuestionCard,
  SingleQuestionFormArray,
} from 'src/app/core/models/interfaces';
import { LocalStorageService } from 'src/app/core/services/localStorage.service';
import { UnsubscribeService } from 'src/app/core/services/unsubscribe.service';
import { cardFactory } from 'src/app/core/factories/card';

@Component({
  selector: 'app-question-create',
  templateUrl: './question-create.component.html',
  styleUrls: ['./question-create.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [UnsubscribeService],
})
export class QuestionCreateComponent {
  public questionType: CardType | undefined = undefined;
  public isValidAnswers: boolean = this.isEnoughAnswers(this.questionType);
  public card: QuestionCard = {} as QuestionCard;
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
    private readonly fb: FormBuilder
  ) {}

  public onSubmit(): void {
    const cardOptions = {
      ...this.card,
      id: this.localStorage.getId(),
      date: Date.now(),
      type: this.questionType,
    };
    this.card = this.factory.createCard(cardOptions);
    this.card.updateCardByForm(this.form);
    this.localStorage.addCard(this.card);
    this.localStorage.setNewId();
    this.router.navigateByUrl('/manage');
  }

  public onChange(type: CardType): void {
    this.clearAnswers();
    this.questionType = type;
    this.addAnswer(type);
    this.isValidAnswers = this.isEnoughAnswers(type);
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

  public clearAnswers(): void {
    this.singles.clear();
    this.multiples.clear();
    this.open.clear();
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

  private addSingleAnswer(): void {
    const singleAnswerForm: FormGroup = this.fb.group({
      text: ['', Validators.required],
      radio: { value: '', disabled: true },
    });
    this.singles.push(singleAnswerForm);
  }

  private addMultipleAnswer(): void {
    const multipleAnswerForm: FormGroup = this.fb.group({
      text: ['', Validators.required],
      input: { value: '', disabled: true },
    });
    this.multiples.push(multipleAnswerForm);
  }

  private addOpenAnswer(): void {
    this.open.push(this.fb.control({ value: '', disabled: true }));
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
