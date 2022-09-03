import { Pipe, PipeTransform } from '@angular/core';
import { OpenQuestionCard, QuestionCard } from 'src/app/core/models/interfaces';

@Pipe({
  name: 'openQuestion',
})
export class OpenQuestionPipe implements PipeTransform {
  transform(card: QuestionCard): OpenQuestionCard {
    return card as OpenQuestionCard;
  }
}
