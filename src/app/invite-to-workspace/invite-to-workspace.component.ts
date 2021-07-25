import { Component, OnInit, Inject } from '@angular/core';
import { Observable } from 'rxjs';
import { Workspace } from '../interfaces/workspace';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';
import { BehaviorSubject } from 'rxjs';
import { GetUserinfoService } from '../services/get-userinfo.service';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Clipboard } from '@angular/cdk/clipboard';

const getObservable = (collection: AngularFirestoreCollection<Workspace>) => {
  const subject = new BehaviorSubject<Workspace[]>([]);
  collection.valueChanges({ idField: 'id' }).subscribe((val: Workspace[]) => {
    subject.next(val);
  });
  return subject;
};

@Component({
  selector: 'app-invite-to-workspace',
  templateUrl: './invite-to-workspace.component.html',
  styleUrls: ['./invite-to-workspace.component.css']
})
export class InviteToWorkspaceComponent implements OnInit {

  workspaces: Observable<Workspace[]>;
  currentUid: string = this.getUserInfo.getUserId();
  selected: string = "None";

  constructor(
              private store: AngularFirestore,
              private getUserInfo: GetUserinfoService,
              private clipboard: Clipboard,
              public dialogRef: MatDialogRef<InviteToWorkspaceComponent>,
              @Inject(MAT_DIALOG_DATA) public data: any
              ) {
    this.currentUid = this.getUserInfo.getUserId();
    
    this.workspaces = getObservable(this.store.collection('workspaces', ref => {
      return ref
      .where("users", "array-contains", this.currentUid);
    })) as Observable<Workspace[]>;
  
  }

  ngOnInit(): void {
  }

  copyCode() {
    this.clipboard.copy(this.selected);
  }

}
