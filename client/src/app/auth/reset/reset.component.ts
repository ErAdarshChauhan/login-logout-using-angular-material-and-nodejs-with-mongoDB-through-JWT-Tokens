import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-reset',
  templateUrl: './reset.component.html',
  styleUrls: ['./reset.component.css']
})
export class ResetComponent implements OnInit {

  message:string;

  resetPasswordForm : FormGroup;

  constructor(private builder:FormBuilder) {
    this.resetPasswordForm = this.builder.group({
      email : ['', Validators.email]
    });
   }

  ngOnInit(): void {

  }

  postResetForm(){

  }

  resetForm(){
    if(this.resetPasswordForm.invalid)
      return ;
      this.resetPasswordForm.reset();
  }
}
