import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { QuestionTypeSwitchPanelComponent } from './question-type-switch-panel.component';
import { MaterialModule } from 'src/app/material.module';

@NgModule({
  declarations: [QuestionTypeSwitchPanelComponent],
  imports: [CommonModule, MaterialModule],
  exports: [QuestionTypeSwitchPanelComponent],
})
export class QuestionTypeSwitchPanelModule {}
