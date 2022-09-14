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
}
