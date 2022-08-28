import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { QuestionManageComponent } from './question-manage.component';
import { MaterialModule } from 'src/app/material.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CardsModule } from 'src/app/components/cards/cards.module';
import { QuestionManageRoutingModule } from './question-manage-routing.module';

@NgModule({
  declarations: [QuestionManageComponent],
  imports: [
    CommonModule,
    FormsModule,
    QuestionManageRoutingModule,
    ReactiveFormsModule,
    MaterialModule,
    CardsModule,
  ],
})
export class QuestionManageModule {}
