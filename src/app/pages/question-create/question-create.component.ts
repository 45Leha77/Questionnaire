import { ChangeDetectionStrategy, Component } from '@angular/core';
import { FormArray, FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { CardType } from 'src/app/enums/card-type';

import {
  QuestionCard,
  Answer,
  QuestionsTypes,
} from 'src/app/models/interfaces';
import { LocalStorageService } from 'src/app/services/localStorage.service';
import { UnsubscribeService } from 'src/app/services/unsubscribe.service';

@Component({
  selector: 'app-question-create',
  templateUrl: './question-create.component.html',
  styleUrls: ['./question-create.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [UnsubscribeService],
})
export class QuestionCreateComponent {
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

  get singles(): FormArray<any> {
    return this.form.get('singles') as FormArray;
  }

  get multiples(): FormArray<any> {
    return this.form.get('multiples') as FormArray;
  }

  get open(): FormArray<any> {
    return this.form.get('open') as FormArray;
  }

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
  }

  public clearAnswers(): void {
    this.singles.clear();
    this.multiples.clear();
    this.open.clear();
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
      let single: Answer[] = [];
      this.form.value.singles.forEach((singleData: any) => {
        single.push({ value: singleData.text });
      });
      this.card.single = single;
    }

    if (this.card.type === this.cardType.multiple) {
      let multiple: Answer[] = [];
      this.form.value.multiples.forEach((multipleData: any) => {
        multiple.push({ value: multipleData.text });
      });
      this.card.multiple = multiple;
    }
  }
}
