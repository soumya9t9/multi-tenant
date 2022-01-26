import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeViewComponent } from './components/home-view/home-view.component';
import { CreateFormComponent } from './create-form/create-form.component';

const routes: Routes = [
  {
    path:'home-view',
    component: HomeViewComponent
  },
  {
    path: "create-form",
    component: CreateFormComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class HomeRoutingModule { }
