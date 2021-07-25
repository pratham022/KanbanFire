import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Board } from '../interfaces/board';

@Component({
  selector: 'app-board',
  templateUrl: './board.component.html',
  styleUrls: ['./board.component.css']
})
export class BoardComponent implements OnInit {

  @Input() board: Board;
  @Output() edit = new EventEmitter<Board>();
  constructor() { 
    this.board = {
      name: '',
      id: '',
      workspaceId: ''
    }
  }

  ngOnInit(): void {
  }

  editBoard() {
    this.edit.emit(this.board)
  }
}
