import { ChangeDetectionStrategy, Component } from '@angular/core';
import { CardType } from 'src/app/enums/card-type';

import { QuestionCard } from 'src/app/models/interfaces';
import { LocalStorageService } from 'src/app/services/localStorage.service';

@Component({
  selector: 'app-question-manage',
  templateUrl: './question-manage.component.html',
  styleUrls: ['./question-manage.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class QuestionManageComponent {
  public cards: QuestionCard[] = this.localStorage.getCards();
  public cardType = CardType;

  constructor(private localStorage: LocalStorageService) {}

  public onDelete(id: number): void {
    this.localStorage.deleteCard(id);
    this.cards = this.localStorage.getCards();
  }
}
