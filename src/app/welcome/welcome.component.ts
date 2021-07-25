import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { CreateWorkspaceComponent } from '../create-workspace/create-workspace.component';

import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument } from '@angular/fire/firestore';
import { Observable, merge } from 'rxjs';
import { GetUserinfoService } from '../services/get-userinfo.service';
import { SnackbarService } from '../services/snackbar.service';
import { messages } from '../messages';
import { Router } from '@angular/router';
import { InviteToWorkspaceComponent } from '../invite-to-workspace/invite-to-workspace.component';
import { JoinWorkspaceComponent } from '../join-workspace/join-workspace.component';
import { BehaviorSubject } from 'rxjs';
import { Workspace } from '../interfaces/workspace'; 
import  firebase  from 'firebase/app';


@Component({
  selector: 'app-welcome',
  templateUrl: './welcome.component.html',
  styleUrls: ['./welcome.component.css']
})
export class WelcomeComponent implements OnInit {

  currDoc: any;

  constructor(private dialog: MatDialog, 
              private store: AngularFirestore,
              private getUserInfo: GetUserinfoService, 
              private snackBarService: SnackbarService,
              private router: Router
              ) { 

                this.currDoc = {}
              }

  ngOnInit(): void {
  }

  inviteTeammate() {
    const dialogRef = this.dialog.open(InviteToWorkspaceComponent, {
      width: '270px',
      data: {
        okBtnMsg: "Ok",
        closeBtnMsg: "Close"
      }
    })
    dialogRef.afterClosed().subscribe((result: any) => {
      if(result == 'Close') {
        // cancelled operation
      }
      else if(result == 'Ok'){
        // copied workspace code
        this.snackBarService.openSnackBar(messages.codeCopied, "Dismiss", messages.success);
      }
    }, (error) => {
      this.snackBarService.openSnackBar(messages.http500Error, "Dismiss", messages.failure);
    })
  }

  createWorkspace(): void {
    const dialogRef = this.dialog.open(CreateWorkspaceComponent, {
      width: '270px',
      data: {
        workspace: {
          users: [],
          userNames: [],
        }
      }
    });
    dialogRef.afterClosed().subscribe((result: any) => {
      if(result != undefined) {
        if(result.workspace.name !== undefined) {
          result.workspace.users.push(this.getUserInfo.getUserId())
          result.workspace.userNames.push(this.getUserInfo.getUserEmail())
          this.store.collection('workspaces').add(result.workspace);
          this.snackBarService.openSnackBar(messages.workspaceCreated, "Dismiss", messages.success);
          this.router.navigate(['workspaces'])
        }
      }
      
    }, (error) => {
      this.snackBarService.openSnackBar(messages.workspaceCreateFailure, "Dismiss", messages.failure);
    })
  }

  createBoard() {

  }

  joinWorkspace() {
    const dialogRef = this.dialog.open(JoinWorkspaceComponent, {
      width: '270px',
      data: {
        code: '',
        closeBtnMsg: "Close",
        okBtnMsg: 'Ok',
      }
    });
    dialogRef.afterClosed().subscribe((result: any) => {
      if(result == 'Close' || result == undefined) {
        // operation cancelled
        console.log("Operation cancelled");
      }
      else{
        // user has entered the code...Try to join the workspace
        console.log(result);
        const code = result[0];
        const userId = this.getUserInfo.getUserId();
        const userEmail = this.getUserInfo.getUserEmail();
        console.log(code);

        // update document in firestore
        this.store.collection('workspaces').doc(code).update({
          userNames: firebase.firestore.FieldValue.arrayUnion(userEmail),
          users: firebase.firestore.FieldValue.arrayUnion(userId)
        }).then(() => {
          this.snackBarService.openSnackBar(messages.joinedWorkspace, "Dismiss", messages.success);
          this.router.navigate(['workspaces'])
        }).catch((error) => {
          this.snackBarService.openSnackBar(messages.joinedWorkspaceFailure, "Dismiss", messages.failure);
        })

      }
    })
  }
}
