import { Component, OnInit } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { AuthService } from "../../auth/auth.service";
import { Router } from '@angular/router';
@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  username : string;

  constructor(private service: AuthService,private router:Router) { }

  ngOnInit(): void {
    this.getname();
  }

  //getting Username from mongoDB through verify token
  getname(){
    this.service.getUserName().subscribe(
      data =>{
        console.log(data);
        this.username = data.toString()
      },
      error => this.router.navigate(['/auth/login'])
    );
  }

  logout(){
    localStorage.removeItem('token');
    this.router.navigate(['/auth/login']);
  }
}
