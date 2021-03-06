import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http'; 
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppMaterialModule } from './app.material.module';
import { HomeComponent } from './home/home.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { BoardComponent } from './board/board.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ListComponent } from './list/list.component'; 
import { JwtInterceptor } from './services/JwtInterceptor';
import { JwtErrorInterceptor } from './services/JwtErrorInterceptor';
import { AuthGuard } from './services/AuthGuard';
import { AuthGuardForHome } from './services/AuthGuardForHome';
import { DragDropModule } from '@angular/cdk/drag-drop';



@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    DashboardComponent,
    BoardComponent,
    ListComponent
  ],
  imports: [
    BrowserModule,   
    AppRoutingModule,
    BrowserAnimationsModule,
    AppMaterialModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: JwtErrorInterceptor, multi: true },
    AuthGuard,
    AuthGuardForHome
  ],
  bootstrap: [AppComponent,AuthGuard,AuthGuardForHome]
})
export class AppModule { }
