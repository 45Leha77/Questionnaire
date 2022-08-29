import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup } from '@angular/forms';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { filter, map, takeUntil, tap } from 'rxjs';
import { CardType } from 'src/app/core/enums/card-type';

import {
  QuestionCard,
  Answer,
  QuestionsTypes,
  AnswerCheckboxFormValue,
  AnswerRadioFormValue,
} from 'src/app/core/models/interfaces';
import { LocalStorageService } from 'src/app/core/services/localStorage.service';
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
  public card!: QuestionCard;
  public form: FormGroup = this.fb.group({
    question: '',
    singles: this.fb.array([]),
    multiples: this.fb.array([]),
    open: this.fb.array([]),
  });
  private cardType = CardType;
  constructor(
    private localStorage: LocalStorageService,
    private router: Router,
    private route: ActivatedRoute,
    private fb: FormBuilder,
    private unsubscribe: UnsubscribeService
  ) {}

  ngOnInit(): void {
    this.route.queryParamMap;
    this.route.queryParamMap
      .pipe(
        map((param: ParamMap) => param.get('id')),
        filter((id) => !!id),
        tap((id) => {
          this.card = this.localStorage.getCardById(+id!);
          this.questionType = this.card.type;
          this.updateForm();
        }),
        takeUntil(this.unsubscribe.destroy$)
      )
      .subscribe();
  }

  get singles(): FormArray {
    return this.form.get('singles') as FormArray;
  }

  get multiples(): FormArray {
    return this.form.get('multiples') as FormArray;
  }

  get open(): FormArray {
    return this.form.get('open') as FormArray;
  }

  public onEdit(): void {
    this.card = {
      ...this.card,
      type: this.questionType,
      question: this.form.value.question,
    };
    this.addAnswersToCard();
    this.localStorage.saveEdit(this.card);
    this.router.navigateByUrl('/manage');
  }

  public addAnswer(): void {
    if (this.questionType === this.cardType.single) {
      this.addSingleAnswer();
    }

    if (this.questionType === this.cardType.multiple) {
      this.addMultipleAnswer();
    }

    if (this.questionType === this.cardType.open) {
      this.card = {
        ...this.card,
        open: true,
      };
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
    this.card.type === type ? this.updateForm() : this.addAnswer();
  }

  private addSingleAnswer(answer?: Answer): void {
    this.singles.push(
      this.fb.group({
        text: answer ? answer.value : 'input your answer',
        radio: { value: '', disabled: true },
      })
    );
  }

  private addMultipleAnswer(answer?: Answer): void {
    this.multiples.push(
      this.fb.group({
        text: answer ? answer.value : 'input your answer',
        input: { value: '', disabled: true },
      })
    );
  }

  private addOpenAnswer(): void {
    this.open.push(this.fb.control('open'));
  }

  private updateForm(): void {
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

  private clearAnswers(): void {
    this.singles.clear();
    this.multiples.clear();
    this.open.clear();
  }
}
