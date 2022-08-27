import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { QuestionManageComponent } from './question-manage.component';

const routes: Routes = [{ path: '', component: QuestionManageComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class QuestionManageRoutingModule {}
