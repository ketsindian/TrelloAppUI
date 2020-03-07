import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { Board } from '../models/board';

import { BoardServiceService } from '../services/board-service.service';

import { List } from './../models/list';
import { ListService } from './../services/list.service';

@Component({
  selector: 'app-board',
  templateUrl: './board.component.html',
  styleUrls: ['./board.component.css']
})
export class BoardComponent implements OnInit {

  board:Board;
  lists:List[];

  constructor(private route: ActivatedRoute, private boardService: BoardServiceService, private listService: ListService, private location: Location) { }

  ngOnInit(): void {
    this.getBoard();
    this.getLists();
  }

  getBoard(): void {
    const boardID = this.route.snapshot.paramMap.get('id');
    this.boardService.getBoard(boardID).subscribe(board => this.board = board);
  }

  getLists(): void {
    const boardID = this.route.snapshot.paramMap.get('id');
    this.listService.getLists(Number(boardID)).subscribe(lists => {
      this.lists = lists;
    });
  }

  addList(name: string) {
    const boardID = this.board.board_id;
    name = name.trim();
    if(!name) { return; }
    this.listService.addList(boardID,{ list_name: name} as List).subscribe(list => {
      this.lists.push(list);
    });
  }

  deleteListHandler(list: List) {
    const boardID = this.board.board_id;
    this.listService.deleteList(boardID,list).subscribe(deletedList => {
      console.log(list);
      let listIndex = this.lists.indexOf(list);
      if(listIndex != -1) {
        this.lists.splice(listIndex, 1);
      }
    });
  }

  updateListHandler(list: List) {
    const boardID = this.board.board_id;
    this.listService.updateList(boardID,list).subscribe(list => { });
  }

  goBack(): void {
    this.location.back();
  }


}
