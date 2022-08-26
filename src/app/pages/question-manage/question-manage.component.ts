import { ChangeDetectionStrategy, Component } from '@angular/core';

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

  constructor(private localStorage: LocalStorageService) {}

  public onDelete(id: number) {
    this.localStorage.deleteCard(id);
    this.cards = this.localStorage.getCards();
  }
}
