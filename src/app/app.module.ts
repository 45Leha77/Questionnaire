import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { QuestionManageComponent } from './pages/question-manage/question-manage.component';
import { QuestionEditComponent } from './pages/question-edit/question-edit.component';
import { QuestionListComponent } from './pages/question-list/question-list.component';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatNativeDateModule } from '@angular/material/core';

import { NavComponent } from './components/nav/nav.component';
import { MAT_RADIO_DEFAULT_OPTIONS } from '@angular/material/radio';
import { MAT_CHECKBOX_DEFAULT_OPTIONS } from '@angular/material/checkbox';
import { QuestionCreateComponent } from './pages/question-create/question-create.component';
import { OpenCardComponent } from './components/cards/open-answer-card/open-card.component';
import { SingleCardComponent } from './components/cards/single-answer-card/single-card.component';
import { MultipleCardComponent } from './components/cards/multiple-answer-card/multiple-card.component';
import { MaterialExampleModule } from './material.module';

@NgModule({
  declarations: [
    AppComponent,
    QuestionManageComponent,
    QuestionEditComponent,
    QuestionListComponent,
    NavComponent,
    QuestionCreateComponent,
    OpenCardComponent,
    SingleCardComponent,
    MultipleCardComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    FormsModule,
    HttpClientModule,
    MatNativeDateModule,
    MaterialExampleModule,
    ReactiveFormsModule,
  ],
  providers: [
    {
      provide: MAT_RADIO_DEFAULT_OPTIONS,
      useValue: { color: 'warn' },
    },
    {
      provide: MAT_CHECKBOX_DEFAULT_OPTIONS,
      useValue: { color: 'warn' },
    },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
