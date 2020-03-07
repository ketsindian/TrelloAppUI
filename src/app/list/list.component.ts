import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { List } from '../models/list';
import { Card } from '../models/card';
import { CardService } from '../services/card.service';
import { Board } from '../models/board';


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
}
