import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup } from '@angular/forms';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { map, takeUntil, tap } from 'rxjs';

import {
  QuestionCard,
  Answer,
  QuestionsTypes,
} from 'src/app/models/interfaces';
import { LocalStorageService } from 'src/app/services/localStorage.service';
import { UnsubscribeService } from 'src/app/services/unsubscribe.service';

@Component({
  selector: 'app-question-edit',
  templateUrl: './question-edit.component.html',
  styleUrls: ['./question-edit.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [UnsubscribeService],
})
export class QuestionEditComponent implements OnInit {
  public questionTypesList: QuestionsTypes[] = ['single', 'multiple', 'open'];
  public questionType!: QuestionsTypes;
  public card!: QuestionCard;
  public form: FormGroup = this.fb.group({
    question: 'Input your question',
    singles: this.fb.array([]),
    multiples: this.fb.array([]),
    open: this.fb.array([]),
  });
  constructor(
    private localStorage: LocalStorageService,
    private router: Router,
    private route: ActivatedRoute,
    private fb: FormBuilder,
    private unSubscribe: UnsubscribeService
  ) {}

  ngOnInit(): void {
    this.route.queryParamMap
      .pipe(
        map((param: ParamMap) => {
          return param.get('id');
        }),
        tap((id: string | null) => {
          if (!!id) {
            this.card = this.localStorage.getCardById(+id);
            this.questionType = this.card.type;
            this.updateForm();
          }
        }),
        takeUntil(this.unSubscribe.destroy$)
      )
      .subscribe();
  }

  get singles(): FormArray<any> {
    return this.form.get('singles') as FormArray;
  }

  get multiples(): FormArray<any> {
    return this.form.get('multiples') as FormArray;
  }

  get open(): FormArray<any> {
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

  private addMultipleAnswer(answer?: Answer) {
    this.multiples.push(
      this.fb.group({
        text: answer ? answer.value : 'input your answer',
        input: { value: '', disabled: true },
      })
    );
  }

  private addOpenAnswer(): void {
    this.open.push(this.fb.control('Open answer'));
  }

  private updateForm() {
    this.form.patchValue({ question: this.card.question });

    if (this.card.type == 'open') {
      this.addOpenAnswer();
    }
    if (this.card.type == 'single') {
      this.card.single.forEach((single: Answer) => {
        this.addSingleAnswer(single);
      });
    }
    if (this.card.type == 'multiple') {
      this.card.multiple.forEach((multiple: Answer) => {
        this.addMultipleAnswer(multiple);
      });
    }
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

  private clearAnswers(): void {
    this.singles.clear();
    this.multiples.clear();
    this.open.clear();
  }
}
