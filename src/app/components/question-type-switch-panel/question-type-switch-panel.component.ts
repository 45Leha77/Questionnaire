import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Output,
} from '@angular/core';
import { CardType } from 'src/app/enums/card-type';
import { QuestionsTypes } from 'src/app/models/interfaces';

@Component({
  selector: 'app-question-type-switch-panel',
  templateUrl: './question-type-switch-panel.component.html',
  styleUrls: ['./question-type-switch-panel.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class QuestionTypeSwitchPanelComponent {
  public cardType = CardType;
  public questionTypesList: CardType[] = Object.values(this.cardType);
  public questionType: QuestionsTypes | undefined = undefined;

  @Output() radioButtonChange: EventEmitter<QuestionsTypes> =
    new EventEmitter<QuestionsTypes>();
  @Output() addAnswer: EventEmitter<void> = new EventEmitter<void>();

  public onChange(type: QuestionsTypes): void {
    this.radioButtonChange.emit(type);
  }

  public onAddAnswer(): void {
    this.addAnswer.emit();
  }
}
