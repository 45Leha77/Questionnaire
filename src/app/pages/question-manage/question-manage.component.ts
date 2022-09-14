import { ChangeDetectionStrategy, Component } from '@angular/core';
import { CardType } from 'src/app/core/enums/card-type';
import { PageMode } from 'src/app/core/enums/page-mode';

import { QuestionCard } from 'src/app/core/models/interfaces';
import { LocalStorageService } from 'src/app/core/services/localStorage.service';

@Component({
  selector: 'app-question-manage',
  templateUrl: './question-manage.component.html',
  styleUrls: ['./question-manage.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class QuestionManageComponent {
  public cards: QuestionCard[] = this.localStorage.getCards();
  public cardType = CardType;
  public pageMode = PageMode;

  constructor(private readonly localStorage: LocalStorageService) {}

  public onDelete(id: number): void {
    this.localStorage.deleteCard(id);
    this.cards = this.localStorage.getCards();
  }
}
