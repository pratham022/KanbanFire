import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { CreateWorkspaceComponent } from '../create-workspace/create-workspace.component';

import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { GetUserinfoService } from '../services/get-userinfo.service';
import { SnackbarService } from '../services/snackbar.service';
import { messages } from '../messages';
import { Router } from '@angular/router';

@Component({
  selector: 'app-welcome',
  templateUrl: './welcome.component.html',
  styleUrls: ['./welcome.component.css']
})
export class WelcomeComponent implements OnInit {

  constructor(private dialog: MatDialog, 
              private store: AngularFirestore,
              private getUserInfo: GetUserinfoService, 
              private snackBarService: SnackbarService,
              private router: Router
              ) { }

  ngOnInit(): void {
  }

  inviteTeammate() {
    console.log("fnc called");
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
}
