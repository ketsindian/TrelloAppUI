import { Component, OnInit } from '@angular/core';
import { Board } from '../models/board';
import { BoardServiceService } from '../services/board-service.service';

@Component({
  selector: 'app-board',
  templateUrl: './board.component.html',
  styleUrls: ['./board.component.css']
})
export class BoardComponent implements OnInit {


  constructor() { }

  ngOnInit(): void {
  }

}
