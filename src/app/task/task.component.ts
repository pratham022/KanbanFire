import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Task } from '../interfaces/task';

@Component({
  selector: 'app-task',
  templateUrl: './task.component.html',
  styleUrls: ['./task.component.css']
})
export class TaskComponent implements OnInit {

  @Input() task: Task;                              // Accept input as Task
  @Output() edit = new EventEmitter<Task>();        // This Task component will emit the edit things (used later)
  constructor() {
    this.task = {
      title: '',
      description: ''
    }
  }

  ngOnInit(): void {
  }

}
