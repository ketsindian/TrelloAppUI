import { Component, OnInit } from '@angular/core';
import { catchError, map, tap } from 'rxjs/operators';
import { LoginRequest } from '../models/loginRequest';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {



  constructor(private authService:AuthService, private router:Router) { }

  email:string;
  password:string;
  loginRequest:LoginRequest;
  ngOnInit(): void {

  }

  login() :void{
    if(!this.email || !this.password){return;}
    this.authService.login({"email":this.email,"password":this.password}).subscribe(
      res => this.router.navigate(["/dashboard"],
      ));
  }
}
