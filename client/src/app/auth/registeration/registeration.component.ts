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
  statusError:boolean = false;
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

  resetForm(){
    if(this.registerForm.invalid)
      return ;
      this.registerForm.reset();
  }

  postRegisterForm(){
   if(this.registerForm.valid){
    let formData = this.registerForm.value;
    console.log(formData);

    //call service method to register user
    this.service.registerUser(formData).subscribe(
      data =>{
        
        this.successMessage = "User Registered Successfully...";
        
        this.statusError = true;
        this.registerForm.reset();
        setTimeout(() => {
          this.router.navigate(['/auth/login'], {relativeTo: this.activatedRoute});
        }, 3000);
        
      },
      err => {
        this.statusError = false;
        // if (err.error.msg) {
        //   this.successMessage = err.error.msg[0].message;
        // }
        if (err.error.message) {
          this.successMessage = err.error.message;
        }
      }
    );
   }
    
  }
}
