import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { filter, map, takeUntil, tap } from 'rxjs';
import { CardType } from 'src/app/core/enums/card-type';
import {
  QuestionCard,
  Answer,
  SingleQuestionCard,
  MultipleQuestionCard,
} from 'src/app/core/models/interfaces';
import { LocalStorageService } from 'src/app/core/services/localStorage.service';
import { UnsubscribeService } from 'src/app/core/services/unsubscribe.service';
import { EditCreateCommon } from '../edit-create.common-functionality';

@Component({
  selector: 'app-question-edit',
  templateUrl: './question-edit.component.html',
  styleUrls: ['./question-edit.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [UnsubscribeService],
})
export class QuestionEditComponent extends EditCreateCommon implements OnInit {
  constructor(
    private readonly localStorage: LocalStorageService,
    private readonly router: Router,
    private readonly route: ActivatedRoute,
    private readonly unsubscribe: UnsubscribeService
  ) {
    super();
  }

  ngOnInit(): void {
    this.route.queryParamMap
      .pipe(
        map((param: ParamMap) => param.get('id')),
        tap((id) => {
          const card: QuestionCard | undefined = this.localStorage.getCardById(
            +(id as string)
          );
          if (card) {
            this.card = this.factory.createCard(card);
            this.questionType = this.card.type;
            this.updateForm();
          }
        }),
        takeUntil(this.unsubscribe.destroy$)
      )
      .subscribe();
    this.validateByAnswersNumber();
  }

  protected onEdit(): void {
    this.createNewCardIfTypeChanged();
    (this.card as QuestionCard).updateCardByForm(this.form);
    this.localStorage.saveEdit(this.card as QuestionCard);
    this.router.navigateByUrl('/manage');
  }

  protected onUndo(): void {
    this.clearAnswers();
    this.updateForm();
  }

  protected onChange(type: CardType): void {
    this.clearAnswers();
    this.questionType = type;
    this.card?.type === type ? this.updateForm() : this.addAnswer(type);
    this.validateByAnswersNumber();
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

  private createNewCardIfTypeChanged() {
    if (!this.card) {
      return;
    }
    if (this.card.type !== this.questionType) {
      this.card.type = this.questionType;
      this.card = this.factory.createCard(this.card);
    }
  }
}
