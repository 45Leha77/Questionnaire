import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { QuestionListComponent } from './question-list.component';
import { MaterialModule } from 'src/app/material.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CardsModule } from 'src/app/components/cards/cards.module';
import { QuestionListRoutingModule } from './question-list-routing.module';

@NgModule({
  declarations: [QuestionListComponent],
  imports: [
    CommonModule,
    FormsModule,
    QuestionListRoutingModule,
    ReactiveFormsModule,
    MaterialModule,
    CardsModule,
  ],
})
export class QuestionListModule {}