import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { QuestionCreateComponent } from './question-create.component';
import { MaterialExampleModule } from 'src/app/material.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { QuestionCreateRoutingModule } from './question-create-routing.module';

@NgModule({
  declarations: [QuestionCreateComponent],
  imports: [
    CommonModule,
    FormsModule,
    QuestionCreateRoutingModule,
    ReactiveFormsModule,
    MaterialExampleModule,
  ],
})
export class QuestionCreateModule {}
