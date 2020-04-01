import { Component, OnInit } from '@angular/core';
import { FormGroup,FormBuilder,Validators } from '@angular/forms';
import { LoginEmployeeModel } from './login-employee-model';
import { AuthService } from "../auth.service";
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  hide = true;
  Error:boolean;
  message:string;

  loginForm:FormGroup;

  user:string;
  password:string;

  constructor(private builder:FormBuilder, private service:AuthService, private router:Router, private activatedRoute: ActivatedRoute) {
    this.loginForm = this.builder.group({
      email : ['', Validators.required],
      password : ['', Validators.required],
    });
   }

  ngOnInit(): void {
  }

  resetForm(){
    if(this.loginForm.invalid)
      return ;
      this.loginForm.reset();
  }

  postLoginForm(){
    if(this.loginForm.invalid)
    return;

    let loginFormData = this.loginForm.value;

    console.log(loginFormData);

    this.login(loginFormData);
  }

  login(loginFormData){
    if(this.loginForm.valid){
      this.service.loginUser(loginFormData).subscribe(
        tokenData => {
          console.log(tokenData);
          localStorage.setItem('token',tokenData.toString());
          this.router.navigate(['/admin/dashboard']);
        },
        error =>{
          //client side validation
         //   this.Error = true,
           // this.message = 'Invalid Credentials..'
        // server side validations
           if (error.error.message) {
            this.message = error.error.message;
          }
        }
      );
    }
  }

}
