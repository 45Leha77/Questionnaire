import { ChangeDetectionStrategy, Component } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { CardType } from 'src/app/core/enums/card-type';

import {
  AnswerCheckboxFormValue,
  AnswerRadioFormValue,
  MultipleQuestionFormArray,
  QuestionCard,
  QuestionsTypes,
  SingleQuestionFormArray,
} from 'src/app/core/models/interfaces';
import { LocalStorageService } from 'src/app/core/services/localStorage.service';
import { UnsubscribeService } from 'src/app/core/services/unsubscribe.service';

@Component({
  selector: 'app-question-create',
  templateUrl: './question-create.component.html',
  styleUrls: ['./question-create.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [UnsubscribeService],
})
export class QuestionCreateComponent {
  public isDisabledSubmitButton: boolean = this.validateCard();
  public questionType: QuestionsTypes | undefined = undefined;
  public card: QuestionCard = {
    id: 0,
    type: undefined,
    question: 'Input your question',
    single: [],
    multiple: [],
    open: false,
    date: 0,
    answered: false,
    answerDate: undefined,
  };
  public form: FormGroup = this.fb.group({
    question: 'Input your question',
    singles: this.fb.array([]),
    multiples: this.fb.array([]),
    open: this.fb.array([]),
  });
  private cardType = CardType;
  constructor(
    private localStorage: LocalStorageService,
    private router: Router,
    private fb: FormBuilder
  ) {}

  public onSubmit(): void {
    this.card = {
      ...this.card,
      id: this.localStorage.getId(),
      date: Date.now(),
      type: this.questionType,
      question: this.form.value.question,
    };
    this.addAnswersToCard();
    this.localStorage.addCard(this.card);
    this.localStorage.setNewId();
    this.router.navigateByUrl('/manage');
  }

  public onChange(type: QuestionsTypes): void {
    this.clearAnswers();
    this.questionType = type;
    this.addAnswer();
    this.isDisabledSubmitButton = this.validateCard();
  }

  public addAnswer(): void {
    if (this.questionType === this.cardType.single) {
      this.addSingleAnswer();
    }

    if (this.questionType === this.cardType.multiple) {
      this.addMultipleAnswer();
    }

    if (this.questionType == this.cardType.open) {
      this.card = {
        ...this.card,
        open: true,
      };
      this.addOpenAnswer();
    }
    this.isDisabledSubmitButton = this.validateCard();
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
    this.singles.push(
      this.fb.group({
        text: 'add answer',
        radio: { value: '', disabled: true },
      })
    );
  }

  private addMultipleAnswer(): void {
    this.multiples.push(
      this.fb.group({
        text: 'add answer',
        input: { value: '', disabled: true },
      })
    );
  }

  private addOpenAnswer(): void {
    this.open.push(this.fb.control('open'));
  }

  private addAnswersToCard(): void {
    if (this.card.type === this.cardType.single) {
      this.card.single = this.form.value.singles.map(
        (singleData: { text: AnswerRadioFormValue }) => ({
          value: singleData.text,
        })
      );
    }
    if (this.card.type == this.cardType.multiple) {
      this.card.multiple = this.form.value.multiples.map(
        (multipleData: { text: AnswerCheckboxFormValue }) => ({
          value: multipleData.text,
        })
      );
    }
  }

  private validateCard(): boolean {
    if (!this.questionType) {
      return true;
    }
    if (this.questionType === this.cardType.single) {
      return this.singles.length < 2;
    }
    if (this.questionType === this.cardType.multiple) {
      return this.multiples.length < 2;
    }
    return false;
  }
}
