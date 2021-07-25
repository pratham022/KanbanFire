import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Task } from '../interfaces/task';
import { GetUserinfoService } from '../services/get-userinfo.service';

@Component({
  selector: 'app-task',
  templateUrl: './task.component.html',
  styleUrls: ['./task.component.css']
})
export class TaskComponent implements OnInit {

  @Input() task: Task;                              // Accept input as Task
  @Output() edit = new EventEmitter<Task>();        // This Task component will emit the edit things (used later)
  constructor(private getUserInfo: GetUserinfoService) {
    this.task = {
      title: '',
      description: '',
      boardId: ''
    }
  }

  ngOnInit(): void {
  }

  editTask() {
    this.edit.emit(this.task);
  }

}
