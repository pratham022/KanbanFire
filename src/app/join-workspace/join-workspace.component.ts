import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-join-workspace',
  templateUrl: './join-workspace.component.html',
  styleUrls: ['./join-workspace.component.css']
})
export class JoinWorkspaceComponent implements OnInit {

  constructor(
    public dialogRef: MatDialogRef<JoinWorkspaceComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) { }

  ngOnInit(): void {
  }

}
