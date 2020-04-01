import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { RegisterationComponent } from './registeration/registeration.component';
import { LoginComponent } from './login/login.component';
import { DashboardComponent } from '../admin/dashboard/dashboard.component';
import { ResetComponent } from './reset/reset.component';


const routes: Routes = [
  {path:'auth/registration', component: RegisterationComponent},
  {path:'auth/login', component: LoginComponent},
  {path:'admin/dashboard', component: DashboardComponent},
  {path:'auth/reset', component: ResetComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AuthRoutingModule { }
