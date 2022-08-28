import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { QuestionEditComponent } from './question-edit.component';
import { MaterialModule } from 'src/app/material.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { QuestionEditRoutingModule } from './question-edit-routing.module';
import { QuestionTypeSwitchPanelModule } from 'src/app/components/question-type-switch-panel/question-type-switch-panel.module';

@NgModule({
  declarations: [QuestionEditComponent],
  imports: [
    CommonModule,
    FormsModule,
    QuestionEditRoutingModule,
    ReactiveFormsModule,
    MaterialModule,
    QuestionTypeSwitchPanelModule,
  ],
})
export class QuestionEditModule {}
