import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { List } from '../models/list';
import { Card } from '../models/card';
import { CardService } from '../services/card.service';
import { Board } from '../models/board';
import {CdkDragDrop, moveItemInArray, transferArrayItem} from '@angular/cdk/drag-drop';
import { ListCardChange } from '../models/listCardChange';
import { async } from '@angular/core/testing';

// const wait = (ms) => new Promise(res => setTimeout(res, ms));
// const startAsync = async callback => {
//   await wait(1000);
//   callback('Hello');
//   await wait(1000);
//   callback('And Welcome');
//   await wait(1000);
//   callback('To Async Await Using TypeScript');
// };

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css']
})
export class ListComponent implements OnInit {
  @Input() list: List;
  @Input() board: Board;
  cards:Card[];

  addingCard: boolean = false;
  editingList: boolean = false;
  editingCard: Card;
  cardLastName: string;

  // listCardchng:ListCardChange;
  // cardChange:Card;

  @Output() deleteListEvent = new EventEmitter<List>();
  @Output() updateListEvent = new EventEmitter<List>();
  constructor( private cardService:CardService) {}

  ngOnInit(): void {
    this.getCards();
  }

  deleteList(list: List) {
    if(!list) { return; }
    this.deleteListEvent.emit(list);
  }

  updateList(list: List) {
    if(!list) { return; }
    this.updateListEvent.emit(list);
  }

  editList() {
    this.editingList = !this.editingList;
  }

  getCards(){
    if(!this.list || !this.board){return;}
    this.cardService.getCards(this.board.board_id,this.list.list_id).subscribe(cards => this.cards = cards);
  }

  addCard(cardName: string) {
    cardName = cardName.trim();
    if(!cardName) { return; }
    this.cardService.addCard(this.board.board_id,this.list.list_id, { card_name: cardName } as Card).subscribe(card => {
      this.cards.push(card);
    });
  }

  deleteCard(card:Card) {
    if(!card) { return; }
    this.cardService.deleteCard(this.board.board_id,this.list.list_id,card ).subscribe(deletedCard => {
      console.log(card);
      let cardIndex = this.cards.indexOf(card);
      console.log(card)
      if(cardIndex != -1) {
        this.cards.splice(cardIndex, 1);
      }
    });
  }

  updateCard(card: Card) {
    if(!Card) { return; }
    this.cardService.updateCard(this.board.board_id,this.list.list_id,card).subscribe(card => { });
  }

  editCard(card: Card) {
    if(!this.editingCard)              { this.editingCard = card; }
    else if(this.editingCard == card) { this.editingCard = null;  }
    else                                { this.editingCard = card; }
  }

  changeCardList(boardId:number,listId:string,cardId:string,listCardChange:ListCardChange){
    // this.getCards();
    this.cardService.changeCardList(boardId,listId,cardId,listCardChange);
  }

  changeCardListEvent(event: CdkDragDrop<string[]>){
    // this.getCards();
    // this.cardService.changeCardList(boardId,listId,cardId,listCardChange);
    this.cardService.changeCardList(this.board.board_id,this.list.list_id,this.cards[event.previousIndex].card_id,{"changeListId":-1,"changeCardPriorityId":event.currentIndex})
  }


  drop(event: CdkDragDrop<string[]>) {
    if (event.previousContainer === event.container) {
      console.log(event.previousContainer);
      console.log(event.container.data );
      console.log(event.currentIndex);
      console.log(typeof(event.container.data[event.currentIndex]));
      // this.cardService.changeCardList()
      // this.getCards();
      // const a=this.cards[event.previousIndex].card_id;
      // const b=JSON.parse(JSON.stringify(this.cards[event.previousIndex].card_id));
      // startAsync(text => console.log(text));
      // this.changeCardList(this.board.board_id,this.list.list_id,this.cards[event.previousIndex].card_id,{"changeListId":-1,"changeCardPriorityId":event.currentIndex});
      moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
    } else {
      transferArrayItem(event.previousContainer.data,
                        event.container.data,
                        event.previousIndex,
                        event.currentIndex);
    }
  }
}
