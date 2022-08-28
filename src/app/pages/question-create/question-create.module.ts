import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { QuestionCreateComponent } from './question-create.component';
import { MaterialModule } from 'src/app/material.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { QuestionCreateRoutingModule } from './question-create-routing.module';
import { QuestionTypeSwitchPanelModule } from 'src/app/components/question-type-switch-panel/question-type-switch-panel.module';

@NgModule({
  declarations: [QuestionCreateComponent],
  imports: [
    CommonModule,
    FormsModule,
    QuestionCreateRoutingModule,
    ReactiveFormsModule,
    MaterialModule,
    QuestionTypeSwitchPanelModule
  ],
})
export class QuestionCreateModule {}
