import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MaterialModule } from 'src/app/material.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { QuestionCreateComponent } from './question-create.component';
import { QuestionCreateRoutingModule } from './question-create-routing.module';
import { QuestionTypeSwitchPanelComponent } from 'src/app/components/question-type-switch-panel/question-type-switch-panel.component';

@NgModule({
  declarations: [QuestionCreateComponent],
  imports: [
    CommonModule,
    FormsModule,
    QuestionCreateRoutingModule,
    ReactiveFormsModule,
    MaterialModule,
    QuestionTypeSwitchPanelComponent,
  ],
})
export class QuestionCreateModule {}
