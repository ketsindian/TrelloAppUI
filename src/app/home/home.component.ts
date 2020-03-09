import { Component, OnInit } from '@angular/core';
import { catchError, map, tap } from 'rxjs/operators';
import { LoginRequest } from '../models/loginRequest';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';
import { FormControl, Validators } from '@angular/forms';
import { User } from '../models/user';
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {



  constructor(private authService:AuthService, private router:Router, private userService:UserService) { }

  user:User;
  loginRequest:LoginRequest;
  ngOnInit(): void {

  }

  login() :void{
    if(!this.email || !this.password){return;}
    this.authService.login({"email":String(this.email.value),"password":String(this.password.value)}).subscribe(
      res => this.router.navigate(["/dashboard"],
      ));
  }

  hide=true;
  firstName=new FormControl('',[Validators.required,]);
  lastName=new FormControl('',[Validators.required,]);
  password=new FormControl('',[Validators.required,])
  email = new FormControl('', [Validators.required, Validators.email]);
  

  getErrorMessage() {
    if (this.email.hasError('required')) {
      return 'You must enter a value';
    }

    return this.email.hasError('email') ? 'Not a valid email' : '';
  }

  signup() :void{
    if(!this.email || !this.password || !this.firstName || !this.lastName || this.email.hasError('email')){return;}
    this.userService.addUser({"user_id":"","email_id":String(this.email.value),"password":String(this.password.value),"first_name":String(this.firstName.value),"last_name":String(this.lastName.value)}).subscribe(
      res => this.router.navigate(["/home"],
      ));
  }
}
