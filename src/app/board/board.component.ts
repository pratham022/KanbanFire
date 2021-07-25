import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Board } from '../interfaces/board';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-board',
  templateUrl: './board.component.html',
  styleUrls: ['./board.component.css']
})
export class BoardComponent implements OnInit {

  @Input() board: Board;
  @Output() edit = new EventEmitter<Board>();
  constructor(private router: Router) { 
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

  openBoard() {
    this.router.navigate([`workspaces/${this.board.workspaceId}/boards/${this.board.id}`])
  }
}
