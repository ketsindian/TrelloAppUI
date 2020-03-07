import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {  MatButtonModule } from '@angular/material/button';
import {  MatToolbarModule} from '@angular/material/toolbar';
import { MatInputModule} from '@angular/material/input';
import {MatCardModule} from '@angular/material/card'
import {MatSnackBarModule} from '@angular/material/snack-bar'
import {MatGridListModule} from '@angular/material/grid-list'

@NgModule({
  imports: [
    CommonModule,
    MatInputModule,
    MatButtonModule,
    MatToolbarModule,
     MatCardModule,
    MatGridListModule,
    MatSnackBarModule
  ],
  exports: [
    MatInputModule,
    MatButtonModule,
    MatToolbarModule,
    MatCardModule,
    MatGridListModule,
    MatSnackBarModule
  ]
})
export class AppMaterialModule { }