import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { QuestionEditComponent } from './question-edit.component';
import { MaterialExampleModule } from 'src/app/material.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { QuestionEditRoutingModule } from './question-edit-routing.module';

@NgModule({
  declarations: [QuestionEditComponent],
  imports: [
    CommonModule,
    FormsModule,
    QuestionEditRoutingModule,
    ReactiveFormsModule,
    MaterialExampleModule,
  ],
})
export class QuestionEditModule {}
