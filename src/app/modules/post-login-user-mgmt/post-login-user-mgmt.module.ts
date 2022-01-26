import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PostLoginUserMgmtRoutingModule } from './post-login-user-mgmt-routing.module';
import { ChangePswdComponent } from './change-pswd/change-pswd.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MaterialsModule } from '../material/material.module';


@NgModule({
  declarations: [
    ChangePswdComponent
  ],
  imports: [
    CommonModule,
    PostLoginUserMgmtRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    MaterialsModule
  ]
})
export class PostLoginUserMgmtModule { }
