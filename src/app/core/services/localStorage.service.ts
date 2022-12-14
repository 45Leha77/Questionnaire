import { Injectable } from '@angular/core';
import { QuestionCard } from '../models/interfaces';

@Injectable({
  providedIn: 'root',
})
export class LocalStorageService {
  private readonly _cardsKey = 'cards';

  public getId(): number {
    const idString: string | null = localStorage.getItem('id');
    return idString ? +idString : 1;
  }

  public setNewId(): void {
    const updatedId: number = this.getId() + 1;
    localStorage.setItem('id', JSON.stringify(updatedId));
  }

  public addCard(card: QuestionCard): void {
    const cards: QuestionCard[] | [] = this.getCards();
    const extendedCards: QuestionCard[] = [...cards, card];
    this.setToCards(extendedCards);
  }

  public getCards(): QuestionCard[] | [] {
    return localStorage.getItem(this._cardsKey)
      ? JSON.parse(localStorage.getItem(this._cardsKey)!)
      : [];
  }

  public deleteCard(id: number): void {
    const cards: QuestionCard[] = this.getCards();
    const updatedCards: QuestionCard[] = cards.filter((card) => card.id !== id);
    this.setToCards(updatedCards);
  }

  public getCardById(id: number): QuestionCard | undefined {
    let cards: QuestionCard[] = this.getCards();
    return cards.find((card: QuestionCard) => card.id === id);
  }

  public saveEdit(card: QuestionCard): void {
    const cards: QuestionCard[] = this.getCards();
    const updatedCards: QuestionCard[] = cards.map(
      (storeCard: QuestionCard) => {
        return storeCard.id === card.id ? card : storeCard;
      }
    );
    this.setToCards(updatedCards);
  }

  private setToCards(cards: QuestionCard[]): void {
    localStorage.setItem(this._cardsKey, JSON.stringify(cards));
  }
}
