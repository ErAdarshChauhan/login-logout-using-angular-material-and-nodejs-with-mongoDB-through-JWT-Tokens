import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AuthRoutingModule } from './auth-routing.module';
import { RegisterationComponent } from './registeration/registeration.component';

//importing angular material modules

import { LoginComponent } from './login/login.component';
import { FormsModule,ReactiveFormsModule } from "@angular/forms";

import {MatToolbarModule} from '@angular/material/toolbar';
import { MatCardModule } from "@angular/material/card";
import { MatStepperModule } from "@angular/material/stepper";
import { MatFormFieldModule } from "@angular/material/form-field";
import { MatInputModule } from "@angular/material/input";
import { MatIconModule } from "@angular/material/icon";
import { MatButtonModule } from "@angular/material/button";
import { AuthService } from './auth.service';
import { ResetComponent } from './reset/reset.component';

@NgModule({
  declarations: [RegisterationComponent, LoginComponent, ResetComponent],
  imports: [
    CommonModule,
    AuthRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    MatToolbarModule,
    MatCardModule,
    MatStepperModule,
    MatFormFieldModule,
    MatInputModule,
    MatIconModule,
    MatButtonModule
  ],
  exports:[
    CommonModule,
    AuthRoutingModule,
    MatToolbarModule,
   MatCardModule,
   MatStepperModule,
   MatIconModule,
   MatButtonModule
  ],
  providers:[AuthService]
})
export class AuthModule { }

