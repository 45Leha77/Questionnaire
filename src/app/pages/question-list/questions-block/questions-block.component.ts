import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  Output,
} from '@angular/core';
import { CardType } from 'src/app/core/enums/card-type';
import { CardValidator, QuestionCard } from 'src/app/core/models/interfaces';

@Component({
  selector: 'app-questions-block',
  templateUrl: './questions-block.component.html',
  styleUrls: ['./questions-block.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class QuestionsBlockComponent {
  public cardType = CardType;
  @Input() cards: QuestionCard[] | undefined = undefined;
  @Output() submit: EventEmitter<QuestionCard> =
    new EventEmitter<QuestionCard>();
  @Output() undo: EventEmitter<QuestionCard> = new EventEmitter<QuestionCard>();

  private enabled: Set<Number> = new Set<number>();

  public onSubmit(card: QuestionCard): void {
    this.submit.emit(card);
    this.enabled.delete(card.id);
  }

  public onUndo(card: QuestionCard): void {
    this.undo.emit(card);
    if (card.type == this.cardType.open) {
      this.enabled.add(card.id);
    }
  }

  public onCardChange(changedCardForm: CardValidator): void {
    changedCardForm.isValid
      ? this.enabled.add(changedCardForm.id)
      : this.enabled.delete(changedCardForm.id);
  }

  public isCardInvalid(id: number): boolean {
    return !this.enabled?.has(id);
  }
}
