import { Pipe, PipeTransform } from '@angular/core';
import {
  QuestionCard,
  SingleQuestionCard,
} from 'src/app/core/models/interfaces';

@Pipe({
  name: 'singleQuestion',
})
export class SingleQuestionPipe implements PipeTransform {
  transform(card: QuestionCard): SingleQuestionCard {
    return card as SingleQuestionCard;
  }
}
