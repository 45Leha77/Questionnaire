import { ChangeDetectionStrategy, Component } from '@angular/core';
import { CardType } from 'src/app/core/enums/card-type';
import { QuestionCard } from 'src/app/core/models/interfaces';
import { LocalStorageService } from 'src/app/core/services/localStorage.service';

@Component({
  selector: 'app-question-list',
  templateUrl: './question-list.component.html',
  styleUrls: ['./question-list.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class QuestionListComponent {
  private cards: QuestionCard[] = this.localStorage.getCards();
  public unanswered: QuestionCard[] = this.cards?.filter(
    (el: QuestionCard) => !el.isAnswered
  );
  public answered: QuestionCard[] = this.cards
    ?.filter((card: QuestionCard) => card.isAnswered)
    .sort(
      (card: QuestionCard, followingCard: QuestionCard) =>
        (card.answerDate as number) - (followingCard.answerDate as number)
    );
  public cardType = CardType;

  constructor(private readonly localStorage: LocalStorageService) {}

  public onSubmit(card: QuestionCard): void {
    const answeredCard: QuestionCard = this.markCardAsAnswered(card);
    this.localStorage.saveEdit(answeredCard);
    this.unanswered = this.unanswered.filter(
      (el: QuestionCard) => el.id !== card.id
    );
    this.answered = [...this.answered, answeredCard];
  }

  public onUndo(card: QuestionCard): void {
    const unansweredCard: QuestionCard = this.markCardAsUnanswered(card);
    this.localStorage.saveEdit(unansweredCard);
    this.answered = this.answered.filter(
      (el: QuestionCard) => el.id !== card.id
    );
    this.unanswered = [...this.unanswered, unansweredCard];
  }

  private markCardAsAnswered(card: QuestionCard): QuestionCard {
    return {
      ...card,
      isAnswered: true,
      answerDate: Date.now(),
    };
  }

  private markCardAsUnanswered(card: QuestionCard): QuestionCard {
    return {
      ...card,
      isAnswered: false,
      answerDate: 0,
    };
  }
}
