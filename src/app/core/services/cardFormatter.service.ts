import { Injectable } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { CardType } from '../enums/card-type';
import {
  AnswerCheckboxFormValue,
  AnswerRadioFormValue,
  QuestionCard,
} from '../models/interfaces';

@Injectable({ providedIn: 'root' })
export class CardFormatterService {
  private cardType: typeof CardType = CardType;

  public updateCardByForm(card: QuestionCard, form: FormGroup): QuestionCard {
    let updatedCard: QuestionCard = { ...card, question: form.value.question };
    if (updatedCard.type === this.cardType.single) {
      updatedCard = {
        ...updatedCard,
        single: form.value.singles.map(
          (singleData: { text: AnswerRadioFormValue }) => ({
            value: singleData.text,
          })
        ),
      };
    }
    if (updatedCard.type == this.cardType.multiple) {
      updatedCard = {
        ...updatedCard,
        multiple: form.value.multiples.map(
          (multipleData: { text: AnswerCheckboxFormValue }) => ({
            value: multipleData.text,
          })
        ),
      };
    }
    return updatedCard;
  }
}
