import { CommonModule } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  Output,
} from '@angular/core';
import { CardType } from 'src/app/core/enums/card-type';
import { MaterialModule } from 'src/app/material.module';

@Component({
  selector: 'app-question-type-switch-panel',
  templateUrl: './question-type-switch-panel.component.html',
  styleUrls: ['./question-type-switch-panel.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
  imports: [CommonModule, MaterialModule],
})
export class QuestionTypeSwitchPanelComponent {
  public cardType = CardType;
  public questionTypesList: CardType[] = Object.values(this.cardType);

  @Input() public questionType: CardType | undefined = undefined;
  @Output() radioButtonChange: EventEmitter<CardType> =
    new EventEmitter<CardType>();
  @Output() addAnswer: EventEmitter<void> = new EventEmitter<void>();

  public onChange(type: CardType): void {
    this.questionType = type;
    this.radioButtonChange.emit(type);
  }

  public onAddAnswer(): void {
    this.addAnswer.emit();
  }
}
