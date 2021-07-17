import { Component, OnInit } from '@angular/core';
import { Task } from '../interfaces/task';
import { CdkDragDrop, moveItemInArray, transferArrayItem } from '@angular/cdk/drag-drop';
import { MatDialog } from '@angular/material/dialog';
import { TaskDialogComponent } from '../task-dialog/task-dialog.component';
import { TaskDialogResult } from '../interfaces/task-dialog-result';

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

  // add new task will be in the dialog box
  constructor(private dialog: MatDialog) { }

  ngOnInit(): void {
  }

  // for dragging and dropping items between lists and inside list
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

  newTask(): void{
    const dialogRef = this.dialog.open(TaskDialogComponent, {
      width: '270px',
      data: {
        task: {}
      }
    });
    dialogRef.afterClosed().subscribe((result: TaskDialogResult) => {
      console.log("Dialog was closed");
      if(result.task.title != undefined)
        this.todo.push(result.task);

    })
  }

  editTask(list: 'done' | 'todo' | 'inProgress', task: Task): void {
    console.log("here");
    const dialogRef = this.dialog.open(TaskDialogComponent, {
      width: '270px',
      data: {
        task,
        enableDelete: true,
      }
    });
    dialogRef.afterClosed().subscribe((result: TaskDialogResult) => {
      console.log("Res here", result);
      const dataList = this[list];
      const taskIndex = dataList.indexOf(task);
      if(result.delete) {
        dataList.splice(taskIndex, 1);
      }
      else {
        dataList[taskIndex] = task;
      }
    })
  }

}
