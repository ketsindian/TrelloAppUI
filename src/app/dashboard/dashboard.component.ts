import { Component, OnInit } from '@angular/core';
import { Board } from '../models/board';
import { BoardServiceService } from '../services/board-service.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  boards: Board[];
  editingBoard : Board;

  constructor(private boardService:BoardServiceService) { }

  ngOnInit(): void {
    this.getBoards();
  }

  getBoards(): void {
    this.boardService.getBoards().subscribe(boards => this.boards = boards);
  }

  addBoard(board_name: string) {
    board_name = board_name.trim();
    if(!board_name) { return; }
    this.boardService.addBoard({ board_name : board_name , board_owner_id : 1 } as Board).subscribe(board => {
      this.boards.push(board);
    }); 
  }

  deleteBoard(board: Board) {
    if(!board) { return; }
    this.boardService.deleteBoard(board).subscribe(deletedBoard => {
      let boardIndex = this.boards.indexOf(board);
      if(boardIndex != -1) {
        this.boards.splice(boardIndex, 1);
      }
    });
  }

  updateBoard(board: Board) {
    if(!board) { return; }
    this.boardService.updateBoard(board).subscribe(board => { });
  }

  editBoard(board: Board) {
    if(!this.editingBoard)              { this.editingBoard = board; }
    else if(this.editingBoard == board) { this.editingBoard = null;  }
    else                                { this.editingBoard = board; }
  }

}
