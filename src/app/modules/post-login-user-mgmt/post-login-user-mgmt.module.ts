import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PostLoginUserMgmtRoutingModule } from './post-login-user-mgmt-routing.module';
import { ChangePswdComponent } from './change-pswd/change-pswd.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';


@NgModule({
  declarations: [
    ChangePswdComponent
  ],
  imports: [
    CommonModule,
    PostLoginUserMgmtRoutingModule,
    FormsModule,
    ReactiveFormsModule
  ]
})
export class PostLoginUserMgmtModule { }
