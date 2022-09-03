import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SingleQuestionPipe } from './pipes/type-converters/single-question.pipe';
import { MultipleQuestionPipe } from './pipes/type-converters/multiple-question.pipe';
import { OpenQuestionPipe } from './pipes/type-converters/open-question.pipe';

@NgModule({
  declarations: [SingleQuestionPipe, MultipleQuestionPipe, OpenQuestionPipe],
  imports: [CommonModule],
  exports: [SingleQuestionPipe, MultipleQuestionPipe, OpenQuestionPipe],
})
export class SharedModule {}
