import { Component, OnInit, Inject } from '@angular/core';
import { Board } from '../interfaces/board';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { BoardDialogData } from '../interfaces/board-dialog-data';
import { Workspace } from '../interfaces/workspace';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';
import { BehaviorSubject } from 'rxjs';
import { GetUserinfoService } from '../services/get-userinfo.service';
import { Observable } from 'rxjs';


const getObservable = (collection: AngularFirestoreCollection<Workspace>) => {
  const subject = new BehaviorSubject<Workspace[]>([]);
  collection.valueChanges({ idField: 'id' }).subscribe((val: Workspace[]) => {
    subject.next(val);
  });
  return subject;
};

@Component({
  selector: 'app-create-board',
  templateUrl: './create-board.component.html',
  styleUrls: ['./create-board.component.css']
})
export class CreateBoardComponent implements OnInit {

  private backupBoard: Partial<Board> = {...this.data.board}
  workspaces: Observable<Workspace[]>;
  currentUid: string = this.getUserInfo.getUserId();
  selected: string = "None";
  constructor(
    public dialogRef: MatDialogRef<CreateBoardComponent>,
    @Inject(MAT_DIALOG_DATA) public data: BoardDialogData,
    private getUserInfo: GetUserinfoService,
    private store: AngularFirestore,
  ) { 

    this.currentUid = this.getUserInfo.getUserId();
    
    this.workspaces = getObservable(this.store.collection('workspaces', ref => {
      return ref
      .where("users", "array-contains", this.currentUid);
    })) as Observable<Workspace[]>;

  }

  ngOnInit(): void {
  }

  cancel(): void {
    this.data.board.name = this.backupBoard.name;
    this.dialogRef.close({"board": this.data, btn: "cancel"});
  }

  okClicked(): void {
    this.data.board.workspaceId = this.selected
    this.dialogRef.close({ "board": this.data, btn: "ok" });
  }

}
