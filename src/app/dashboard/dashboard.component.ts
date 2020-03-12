import { Component, OnInit } from '@angular/core';
import { Board } from '../models/board';
import { BoardServiceService } from '../services/board-service.service';
import { User } from '../models/user';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  boards: Board[];
  editingBoard : Board;
  sharedUsers: User[];
  unSharedUsers: User[];
  sharingBoard: Board;
  unSharingBoard:Board;
  unSharedUser:User;
  sharedUser:User;

  constructor(private boardService:BoardServiceService) { }

  ngOnInit(): void {
    this.getBoards();
  }

  myControl = new FormControl();  

  getBoards(): void {
    this.boardService.getBoards().subscribe(boards => this.boards = boards);
  }

  getSharedUsers(board:Board): void {
    this.boardService.getSharedUsersForBoard(String(board.board_id)).subscribe(sharedUsers => this.sharedUsers = sharedUsers);
  }

  getUnSharedUsers(board:Board): void {
    this.boardService.getUnSharedUsersForBoard(String(board.board_id)).subscribe(unSharedUsers => this.unSharedUsers = unSharedUsers);
  }

  shareBoard(userId:string):void{
    this.sharingBoard.secondary_user_id=userId;    
    this.boardService.sharedBoard(this.sharingBoard).subscribe(_=>{ })
  }

  unShareBoard(userId:string):void{
    this.unSharingBoard.secondary_user_id=userId;
    console.log('unsharing for'+userId);
    this.boardService.unSharedBoard(this.unSharingBoard).subscribe(_=>{ })
  }

  addBoard(board_name: string) {
    board_name = board_name.trim();
    if(!board_name) { return; }
    this.boardService.addBoard({ board_name : board_name} as Board).subscribe(board => {
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

  getFromTrello(boardId:string){
    boardId = boardId.trim();
    if(!boardId) { return; }
    this.boardService.getFromTrello(boardId).subscribe(board => {
      this.boards.push(board);
    }); 
  }

  editBoard(board: Board) {
    if(!this.editingBoard)              { this.editingBoard = board; }
    else if(this.editingBoard == board) { this.editingBoard = null;  }
    else                                { this.editingBoard = board; }
  }

  shareBoardClick(board: Board) {
    if(this.unSharingBoard){
      this.unSharingBoard=null;
    }
    if(!this.sharingBoard){ 
      this.sharingBoard = board; 
      this.getUnSharedUsers(board);
    }
    else if(this.sharingBoard == board) {
       this.sharingBoard = null;  
    }
    else{ 
      this.sharingBoard = board; 
      this.getUnSharedUsers(board);
    }
  }

  unShareBoardClick(board: Board) {
    if(this.sharingBoard){
      this.sharingBoard=null;
    }
    if(!this.unSharingBoard){ 
      this.unSharingBoard = board; 
      this.getSharedUsers(board);
    }
    else if(this.unSharingBoard == board) { 
      this.unSharingBoard = null;  
    }
    else{ 
      this.unSharingBoard = board; 
      this.getSharedUsers(board);
    }
  }
  
}
