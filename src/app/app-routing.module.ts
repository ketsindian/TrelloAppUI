import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { BoardComponent } from './board/board.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { AuthGuard } from './services/AuthGuard';
import { AuthGuardForHome } from './services/AuthGuardForHome';


const routes: Routes = [
  {    path: '', component: HomeComponent , canActivate : [AuthGuardForHome]},
  {    path:'dashboard' ,component :  DashboardComponent ,canActivate: [AuthGuard] },
  {    path:'b/:id' ,component :  BoardComponent ,canActivate: [AuthGuard] },
  {    path: '**', redirectTo: '' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

