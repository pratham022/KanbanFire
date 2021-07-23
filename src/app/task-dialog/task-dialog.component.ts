import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { TaskDialogData } from '../interfaces/task-dialog-data';
import { Task } from '../interfaces/task';
import { GetUserinfoService } from '../services/get-userinfo.service';

@Component({
  selector: 'app-task-dialog',
  templateUrl: './task-dialog.component.html',
  styleUrls: ['./task-dialog.component.css']
})
export class TaskDialogComponent implements OnInit {

  private backupTask: Partial<Task> = { ...this.data.task };

  constructor(public dialogRef: MatDialogRef<TaskDialogComponent>,
                @Inject(MAT_DIALOG_DATA) public data: TaskDialogData, 
                private getUserInfo: GetUserinfoService) { }

  ngOnInit(): void {
  }

  cancel(): void {
    this.data.task.title = this.backupTask.title;
    this.data.task.description = this.backupTask.description;
    this.data.task.uid = this.getUserInfo.getUserId();
    this.dialogRef.close(this.data);
  }

}
