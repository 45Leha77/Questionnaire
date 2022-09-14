import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { QuestionListComponent } from './question-list.component';
import { MaterialModule } from 'src/app/material.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CardsModule } from 'src/app/components/cards/cards.module';
import { QuestionListRoutingModule } from './question-list-routing.module';
import { SharedModule } from 'src/app/shared/shared.module';
import { QuestionsBlockComponent } from './questions-block/questions-block.component';
import { CardComponent } from './questions-block/card/card.component';

@NgModule({
  declarations: [QuestionListComponent, QuestionsBlockComponent, CardComponent],
  imports: [
    CommonModule,
    FormsModule,
    QuestionListRoutingModule,
    ReactiveFormsModule,
    MaterialModule,
    CardsModule,
    SharedModule
  ],
})
export class QuestionListModule {}
