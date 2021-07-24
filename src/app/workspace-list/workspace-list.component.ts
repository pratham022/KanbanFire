import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Workspace } from '../interfaces/workspace';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';
import { BehaviorSubject } from 'rxjs';
import { GetUserinfoService } from '../services/get-userinfo.service';
import { MatDialog } from '@angular/material/dialog';
import { CreateWorkspaceComponent } from '../create-workspace/create-workspace.component';
import { WorkspaceDialogResult } from '../interfaces/workspace-dialog-result';
import { SnackbarService } from '../services/snackbar.service';
import { messages } from '../messages';

const getObservable = (collection: AngularFirestoreCollection<Workspace>) => {
  const subject = new BehaviorSubject<Workspace[]>([]);
  collection.valueChanges({ idField: 'id' }).subscribe((val: Workspace[]) => {
    subject.next(val);
  });
  return subject;
};

@Component({
  selector: 'app-workspace-list',
  templateUrl: './workspace-list.component.html',
  styleUrls: ['./workspace-list.component.css']
})
export class WorkspaceListComponent implements OnInit {

  workspaces: Observable<Workspace[]>;
  currentUid: string = this.getUserInfo.getUserId();

  constructor(
    private store: AngularFirestore, 
    private getUserInfo: GetUserinfoService,
    private dialog: MatDialog, 
    private snackBarService: SnackbarService
  ) { 
    this.currentUid = this.getUserInfo.getUserId();
    
    this.workspaces = getObservable(this.store.collection('workspaces', ref => {
      return ref
      .where("users", "array-contains", this.currentUid);
    })) as Observable<Workspace[]>;
  }

  ngOnInit(): void {
  }

  editWorkspace(workspace: Workspace): void {
    const dialogRef = this.dialog.open(CreateWorkspaceComponent, {
      width: '270px',
      data: {
        workspace, 
        enableDelete: true,
      }
    });
    dialogRef.afterClosed().subscribe((result: WorkspaceDialogResult) => {
      if(result.delete) {
        this.store.collection('workspaces').doc(workspace.id).delete();
        this.snackBarService.openSnackBar(messages.workspaceDeleted, "Dismiss", messages.success);
      }
      else {
        this.store.collection('workspaces').doc(workspace.id).update(workspace);
        this.snackBarService.openSnackBar(messages.workspaceUpdated, "Dismiss", messages.success);
      }
    }, (error) => {
      this.snackBarService.openSnackBar(messages.http500Error, "Dismiss", messages.failure);
    })
  }

}
