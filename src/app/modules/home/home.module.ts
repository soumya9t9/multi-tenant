import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HomeRoutingModule } from './home-routing.module';
import { HomeViewComponent } from './components/home-view/home-view.component';
import { MaterialsModule } from '../material/material.module';
import { CreateFormComponent } from './create-form/create-form.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { DynFormModule } from '../dyn-form/dyn-form.module';
import { DialogSuccessComponent } from './dialog-success/dialog-success.component';

@NgModule({
  declarations: [HomeViewComponent, CreateFormComponent, DialogSuccessComponent,],
  imports: [
    CommonModule,
    HomeRoutingModule,
    MaterialsModule,
    FormsModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    DynFormModule,
  ]
})
export class HomeModule { }
