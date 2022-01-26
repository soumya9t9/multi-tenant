import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ChangePswdComponent } from './change-pswd/change-pswd.component';

const routes: Routes = [
  {
    path: 'change-password',
    component: ChangePswdComponent
  },
  {
    path: '',
    component: ChangePswdComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PostLoginUserMgmtRoutingModule { }
