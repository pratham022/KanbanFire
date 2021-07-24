import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { TaskDialogData } from '../interfaces/task-dialog-data';
import { GetUserinfoService } from '../services/get-userinfo.service';
import { Workspace } from '../interfaces/workspace';
import { WorkspaceDialogData } from '../interfaces/workspace-dialog-data';

@Component({
  selector: 'app-create-workspace',
  templateUrl: './create-workspace.component.html',
  styleUrls: ['./create-workspace.component.css']
})
export class CreateWorkspaceComponent implements OnInit {

  private backupworkspace: Partial<Workspace> = { ...this.data.workspace };

  constructor(public dialogRef: MatDialogRef<CreateWorkspaceComponent>,
    @Inject(MAT_DIALOG_DATA) public data: WorkspaceDialogData, 
    private getUserInfo: GetUserinfoService) { }

  ngOnInit(): void {
  }

  cancel(): void {
    this.data.workspace.name = this.backupworkspace.name;
    this.data.workspace.description = this.backupworkspace.description;
    this.dialogRef.close(this.data);
  }

}
