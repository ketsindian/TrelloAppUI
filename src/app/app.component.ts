import { Component, OnInit } from '@angular/core';
import { AuthService } from './services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
  title = 'Trello App';
  constructor(private authService:AuthService,private router:Router) { }

  isLoggedin:boolean=false;

  ngOnInit(): void {
    this.isloggedin();
  }

  isloggedin(){
    if(this.router.routerState.snapshot.url===""){
      return false;
      // this.isLoggedin=false;
    }else{
      if(this.authService.getToken){
        return true;
        // this.isLoggedin=true;
      }else{
        return false;
        // this.isLoggedin=false;
      }
    }
  }

  logOut(){
    this.authService.logout();

  }

}
