import { Component, OnInit } from '@angular/core';
import { Task } from '../interfaces/task';
import { CdkDragDrop, moveItemInArray, transferArrayItem } from '@angular/cdk/drag-drop';

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
      title: "Create a Kanban app1",
      description: "Use firebase and angular to create kanban app"
    },
  ];

  inProgress: Task[] = [
    {
      title: "In progress Task1",
      description: "Use firebase and angular to create kanban app"
    },
    {
      title: "In progress Task2",
      description: "Use firebase and angular to create kanban app"
    },
  ]

  done: Task[] = [
    {
      title: 'Check email',
      description: 'Open inbox and check email'
    },
    {
      title: 'Brush teeth',
      description: 'Wake up and brush your teeth'
    }
  ]
  constructor() { }

  ngOnInit(): void {
  }

  drop(event: CdkDragDrop<Task[]>) {
    // if prev and curr containers are same: Item has been dragged into same container
    if(event.previousContainer == event.container) {
      moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
    }
    else if (!event.container.data || !event.previousContainer.data) {
      return;
    } 
    else {
      transferArrayItem(event.previousContainer.data, event.container.data, event.previousIndex, event.currentIndex);
    }
  }

}
