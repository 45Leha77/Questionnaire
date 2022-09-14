import { Directive } from '@angular/core';
import {
  FormArray,
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { CardType } from '../core/enums/card-type';
import { cardFactory } from '../core/factories/card';
import {
  Answer,
  MultipleQuestionFormArray,
  QuestionCard,
  SingleQuestionFormArray,
} from '../core/models/interfaces';

@Directive()
export class EditCreateCommon {
  protected questionType: CardType | undefined = undefined;
  protected isValidAnswers: boolean = true;
  protected card: QuestionCard | undefined;
  protected cardType: typeof CardType = CardType;
  protected factory = cardFactory;
  private fb = new FormBuilder();

  protected form: FormGroup = this.fb.group({
    question: ['', Validators.required],
    singles: this.fb.array([]),
    multiples: this.fb.array([]),
    open: this.fb.array([]),
  });

  get singles(): FormArray<FormGroup<SingleQuestionFormArray>> {
    return this.form.get('singles') as FormArray;
  }

  get multiples(): FormArray<FormGroup<MultipleQuestionFormArray>> {
    return this.form.get('multiples') as FormArray;
  }

  get open(): FormArray<FormControl<string | null>> {
    return this.form.get('open') as FormArray;
  }
  protected clearAnswers(): void {
    this.singles.clear();
    this.multiples.clear();
    this.open.clear();
  }

  protected addSingleAnswer(answer?: Answer): void {
    const singleAnswerForm: FormGroup = this.fb.group({
      text: [answer ? answer.value : '', Validators.required],
      radio: { value: '', disabled: true },
    });
    this.singles.push(singleAnswerForm);
  }

  protected addMultipleAnswer(answer?: Answer): void {
    const multipleAnswerForm: FormGroup = this.fb.group({
      text: [answer ? answer.value : '', Validators.required],
      input: { value: '', disabled: true },
    });
    this.multiples.push(multipleAnswerForm);
  }

  protected addOpenAnswer(): void {
    this.open.push(this.fb.control({ value: '', disabled: true }));
  }

  protected addAnswer(type: CardType): void {
    switch (type) {
      case this.cardType.single:
        this.addSingleAnswer();
        this.isValidAnswers = this.isEnoughAnswers(this.singles.length);
        break;
      case this.cardType.multiple:
        this.addMultipleAnswer();
        this.isValidAnswers = this.isEnoughAnswers(this.multiples.length);
        break;
      case this.cardType.open:
        this.addOpenAnswer();
        break;
      default:
        break;
    }
  }

  protected validateByAnswersNumber(): void {
    if (this.questionType === this.cardType.single) {
      this.isValidAnswers = this.isEnoughAnswers(this.singles.length);
    }
    if (this.questionType === this.cardType.multiple) {
      this.isValidAnswers = this.isEnoughAnswers(this.multiples.length);
    }
  }

  private isEnoughAnswers(answersNumber: number): boolean {
    const _minAnswersNumber: number = 2;
    return answersNumber >= _minAnswersNumber;
  }
}
