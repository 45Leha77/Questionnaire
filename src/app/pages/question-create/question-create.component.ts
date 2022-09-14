import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CardType } from 'src/app/core/enums/card-type';
import { QuestionCard } from 'src/app/core/models/interfaces';

import { LocalStorageService } from 'src/app/core/services/localStorage.service';
import { EditCreateCommon } from '../edit-create.common-functionality';

@Component({
  selector: 'app-question-create',
  templateUrl: './question-create.component.html',
  styleUrls: ['./question-create.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class QuestionCreateComponent
  extends EditCreateCommon
  implements OnInit
{
  constructor(
    private readonly localStorage: LocalStorageService,
    private readonly router: Router
  ) {
    super();
  }
  ngOnInit(): void {
    this.validateByAnswersNumber();
  }

  protected onSubmit(): void {
    const cardOptions = {
      ...(this.card as QuestionCard),
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

  protected onChange(type: CardType): void {
    this.clearAnswers();
    this.questionType = type;
    this.addAnswer(type);
    this.validateByAnswersNumber();
  }
}
