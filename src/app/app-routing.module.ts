import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { BoardComponent } from './board/board.component';
import { DashboardComponent } from './dashboard/dashboard.component';


const routes: Routes = [
  {    path: 'home', component: HomeComponent },
  {    path:'dashboard' ,component :  DashboardComponent  },
  {    path:'b/:id' ,component :  BoardComponent  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

