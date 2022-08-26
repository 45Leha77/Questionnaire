import { Injectable } from '@angular/core';
import { QuestionCard } from '../models/interfaces';

@Injectable({
  providedIn: 'root',
})
export class LocalStorageService {
  private readonly _cardsKey = 'cards';

  public getId(): number {
    const idString: string | null = localStorage.getItem('id');
    return idString ? +idString : 0;
  }

  public setNewId(): void {
    const updatedId: number = this.getId() + 1;
    localStorage.setItem('id', JSON.stringify(updatedId));
  }

  public addCard(card: QuestionCard) {
    const cards: QuestionCard[] = this.getCards();
    const extendedCards = [...cards, card];
    this.setToCards(extendedCards);
  }

  public getCards(): QuestionCard[] {
    return JSON.parse(localStorage.getItem(this._cardsKey) as string);
  }

  public deleteCard(id: number) {
    const cards: QuestionCard[] = this.getCards();
    const updatedCards: QuestionCard[] = cards.filter((card) => card.id !== id);
    this.setToCards(updatedCards);
  }

  public getCardById(id: number): QuestionCard {
    let cards: QuestionCard[] = this.getCards();
    return cards.find((card: QuestionCard) => card.id === id)!;
  }

  public saveEdit(card: QuestionCard) {
    const cards: QuestionCard[] = this.getCards();
    const updatedCards = cards.map((storeCard: QuestionCard) => {
      return storeCard.id === card.id ? card : storeCard;
    });
    this.setToCards(updatedCards);
  }

  private setToCards(cards: QuestionCard[]): void {
    localStorage.setItem(this._cardsKey, JSON.stringify(cards));
  }
}
