import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, AbstractControl } from '@angular/forms';
import { AuthService } from '../auth.service';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-registeration',
  templateUrl: './registeration.component.html',
  styleUrls: ['./registeration.component.css']
})
export class RegisterationComponent implements OnInit {
  hide = true;
  successMessage:string;

  registerForm:FormGroup;

  constructor(private builder:FormBuilder, private service: AuthService, private router:Router,private activatedRoute:ActivatedRoute) { }

  ngOnInit(): void {
    this.registerForm = this.builder.group({
      username : ['', Validators.required],
      password :  ['', Validators.required], 
      // confirmPassword : ['', Validators.required], 
      email : ['', Validators.email]
    });
  }

  //validator to check confirm password.
  // passValidator(control:AbstractControl){
  //   if(control && (control.value !==null || control.value !== undefined)){
  //     const confirmPasswordValue = control.value;
  //     const passControl = control.root.get('password');
  //     if(passControl){
  //       const passValue = passControl.value;
  //       if(passValue !== confirmPasswordValue || passValue === ''){
  //         return{
  //           isError:true
  //         }
  //       }
  //     }
  //   }
  //   return null;
  // }

  postRegisterForm(){
   if(this.registerForm.valid){
    let formData = this.registerForm.value;
    console.log(formData);

    //call service method to register user
    this.service.registerUser(formData).subscribe(
      data =>{
        this.successMessage = "User Registered Successfully...";
        this.registerForm.reset();
        this.router.navigate(['/auth/login'], {relativeTo: this.activatedRoute});
      },
      error =>{
        this.successMessage = "User not Registered something wrong";
      }
    );
   }
    
  }
}
