import { ChangeDetectionStrategy, Component } from '@angular/core';
import { FormArray, FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';

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
  public questionTypesList: QuestionsTypes[] = ['single', 'multiple', 'open'];
  public questionType: QuestionsTypes = 'single';
  public card: QuestionCard = {
    id: 0,
    type: '',
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

  public clearAnswers(): void {
    this.singles.clear();
    this.multiples.clear();
    this.open.clear();
  }

  public onChange(type: QuestionsTypes): void {
    this.clearAnswers();
    this.questionType = type;
    this.addAnswer();
  }

  public addAnswer(): void {
    if (this.questionType == 'single') {
      this.addSingleAnswer();
    }

    if (this.questionType == 'multiple') {
      this.addMultipleAnswer();
    }

    if (this.questionType == 'open') {
      this.card = {
        ...this.card,
        open: true,
      };
      this.addOpenAnswer();
    }
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
    this.open.push(this.fb.control('Open Answer'));
  }

  private addAnswersToCard(): void {
    if (this.card.type == 'single') {
      let single: Answer[] = [];
      this.form.value.singles.forEach((singleData: any) => {
        single.push({ value: singleData.text });
      });
      this.card.single = single;
    }

    if (this.card.type == 'multiple') {
      let multiple: Answer[] = [];
      this.form.value.multiples.forEach((multipleData: any) => {
        multiple.push({ value: multipleData.text });
      });
      this.card.multiple = multiple;
    }
  }
}
