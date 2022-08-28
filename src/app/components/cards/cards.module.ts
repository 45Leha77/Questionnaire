import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MultipleCardComponent } from './multiple-answer-card/multiple-card.component';
import { OpenCardComponent } from './open-answer-card/open-card.component';
import { SingleCardComponent } from './single-answer-card/single-card.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MaterialModule } from 'src/app/material.module';

@NgModule({
  declarations: [MultipleCardComponent, OpenCardComponent, SingleCardComponent],
  imports: [CommonModule, FormsModule, ReactiveFormsModule, MaterialModule],
  exports: [MultipleCardComponent, OpenCardComponent, SingleCardComponent],
})
export class CardsModule {}
