import { Pipe, PipeTransform } from '@angular/core';
import {
  MultipleQuestionCard,
  QuestionCard,
} from 'src/app/core/models/interfaces';

@Pipe({
  name: 'multipleQuestion',
})
export class MultipleQuestionPipe implements PipeTransform {
  transform(card: QuestionCard): MultipleQuestionCard {
    return card as MultipleQuestionCard;
  }
}
