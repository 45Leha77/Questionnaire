import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { QuestionCreateComponent } from './question-create.component';

const routes: Routes = [{ path: '', component: QuestionCreateComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class QuestionCreateRoutingModule {}
