import { Component, OnInit } from '@angular/core';
import { Task } from '../interfaces/task';

@Component({
  selector: 'app-task-list',
  templateUrl: './task-list.component.html',
  styleUrls: ['./task-list.component.css']
})
export class TaskListComponent implements OnInit {

  todo: Task[] = [
    {
      title: "Buy Milk",
      description: "Go to store and buy milk"
    },
    {
      title: "Create a Kanban app",
      description: "Use firebase and angular to create kanban app"
    }
  ]
  constructor() { }

  ngOnInit(): void {
  }

}
