import { Component, OnInit } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';
import { BehaviorSubject, Observable } from 'rxjs';
import { GetUserinfoService } from '../services/get-userinfo.service';
import { MatDialog } from '@angular/material/dialog';
import { Board } from '../interfaces/board';
import { ActivatedRoute } from '@angular/router';
import { CreateBoardComponent } from '../create-board/create-board.component';
import { BoardDialogResult } from '../interfaces/board-dialog-result';
import { SnackbarService } from '../services/snackbar.service';
import { messages } from '../messages';

const getObservable = (collection: AngularFirestoreCollection<Board>) => {
  const subject = new BehaviorSubject<Board[]>([]);
  collection.valueChanges({ idField: 'id' }).subscribe((val: Board[]) => {
    subject.next(val);
  });
  return subject;
};

@Component({
  selector: 'app-board-list',
  templateUrl: './board-list.component.html',
  styleUrls: ['./board-list.component.css']
})
export class BoardListComponent implements OnInit {

  boards: Observable<Board[]>;
  workspaceId: string;

  constructor(
    private store: AngularFirestore,
    private route: ActivatedRoute,
    private dialog: MatDialog,
    private snackBarService: SnackbarService
  ) { 

    this.workspaceId = route.snapshot.params["id"];
    console.log(this.workspaceId);

    this.boards = getObservable(this.store.collection('boards', ref => {
      return ref
      .where("workspaceId", "==", this.workspaceId);
    })) as Observable<Board[]>;
  }

  ngOnInit(): void {
  }

  editBoard(board: Board): void {
    const dialogRef = this.dialog.open(CreateBoardComponent, {
      width: '270px',
      data: {
        board, 
        enableDelete: true,
      }
    });
    dialogRef.afterClosed().subscribe((result: BoardDialogResult) => {
      if(board.workspaceId == 'None')
        board.workspaceId = this.workspaceId;
      if(result.delete) {
        this.store.collection('boards').doc(board.id).delete();
        this.snackBarService.openSnackBar(messages.boardDeleted, "Dismiss", messages.success);
      }
      else {
        this.store.collection('boards').doc(board.id).update(board);
        this.snackBarService.openSnackBar(messages.boardUpdated, "Dismiss", messages.success);
      }
    }, (error) => {
      this.snackBarService.openSnackBar(messages.http500Error, "Dismiss", messages.failure);
    })
  }

}
