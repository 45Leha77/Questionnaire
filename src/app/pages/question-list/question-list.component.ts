import { ChangeDetectionStrategy, Component } from '@angular/core';
import { QuestionCard, CardValidator } from 'src/app/models/interfaces';
import { LocalStorageService } from 'src/app/services/localStorage.service';

@Component({
  selector: 'app-question-list',
  templateUrl: './question-list.component.html',
  styleUrls: ['./question-list.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class QuestionListComponent {
  private cards: QuestionCard[] = this.localStorage.getCards();
  public unanswered: QuestionCard[] = this.cards.filter((el) => !el.answered);
  public answered: QuestionCard[] = this.cards
    .filter((card: QuestionCard) => card.answered)
    .sort((a, b) => (a.answerDate as number) - (b.answerDate as number));

  private enabled: Set<Number> = new Set<number>();

  constructor(private localStorage: LocalStorageService) {}

  public onSubmit(card: QuestionCard): void {
    const updatedCard: QuestionCard = {
      ...card,
      answered: true,
      answerDate: Date.now(),
    };
    this.localStorage.saveEdit(updatedCard);
    this.unanswered = this.unanswered.filter((el) => el.id !== card.id);
    this.answered = [...this.answered, updatedCard];

    this.enabled.delete(card.id);
  }

  public OnUndo(card: QuestionCard): void {
    const updatedCard: QuestionCard = {
      ...card,
      answered: false,
      answerDate: undefined,
      multipleValue: undefined,
      openAnswerValue: undefined,
      singleValue: undefined,
    };

    this.localStorage.saveEdit(updatedCard);
    this.answered = this.answered.filter((el) => el.id !== card.id);
    this.unanswered = [...this.unanswered, updatedCard];

    if (card.type == 'open') {
      this.enabled.add(card.id);
    }
  }

  public isSubmitDisabled(id: number): boolean {
    return this.enabled.has(id) ? false : true;
  }

  public onChange(changedCardForm: CardValidator): void {
    changedCardForm.isValid
      ? this.enabled.add(changedCardForm.id)
      : this.enabled.delete(changedCardForm.id);
  }
}
