import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MaterialModule } from 'src/app/material.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { QuestionEditComponent } from './question-edit.component';
import { QuestionEditRoutingModule } from './question-edit-routing.module';
import { QuestionTypeSwitchPanelComponent } from 'src/app/components/question-type-switch-panel/question-type-switch-panel.component';

@NgModule({
  declarations: [QuestionEditComponent],
  imports: [
    CommonModule,
    FormsModule,
    QuestionEditRoutingModule,
    ReactiveFormsModule,
    MaterialModule,
    QuestionTypeSwitchPanelComponent,
  ],
})
export class QuestionEditModule {}
