import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  { path: '', redirectTo: '/manage', pathMatch: 'full' },
  {
    path: 'manage',
    loadChildren: () =>
      import('./pages/question-manage/question-manage.module').then(
        ({ QuestionManageModule }) => QuestionManageModule
      ),
  },
  {
    path: 'edit',
    loadChildren: () =>
      import('./pages/question-edit/question-edit.module').then(
        ({ QuestionEditModule }) => QuestionEditModule
      ),
  },
  {
    path: 'create',
    loadChildren: () =>
      import('./pages/question-create/question-create.module').then(
        ({ QuestionCreateModule }) => QuestionCreateModule
      ),
  },
  {
    path: 'list',
    loadChildren: () =>
      import('./pages/question-list/question-list.module').then(
        ({ QuestionListModule }) => QuestionListModule
      ),
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
