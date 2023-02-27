import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SquarepayComponent } from './squarepay/squarepay.component';

const routes: Routes = [
  {path:"",redirectTo:"square",pathMatch:"full"},
  {path:"square",component:SquarepayComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
