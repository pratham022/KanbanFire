import { Component, OnInit } from '@angular/core';
import { Task } from '../interfaces/task';
import { CdkDragDrop, moveItemInArray, transferArrayItem } from '@angular/cdk/drag-drop';
import { MatDialog } from '@angular/material/dialog';
import { TaskDialogComponent } from '../task-dialog/task-dialog.component';
import { TaskDialogResult } from '../interfaces/task-dialog-result';

import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { BehaviorSubject } from 'rxjs';
import { GetUserinfoService } from '../services/get-userinfo.service';
import { SnackbarService } from '../services/snackbar.service';
import { messages } from '../messages';
import { ActivatedRoute } from '@angular/router';

const getObservable = (collection: AngularFirestoreCollection<Task>) => {
  const subject = new BehaviorSubject<Task[]>([]);
  collection.valueChanges({ idField: 'id' }).subscribe((val: Task[]) => {
    subject.next(val);
  });
  return subject;
};

@Component({
  selector: 'app-task-list',
  templateUrl: './task-list.component.html',
  styleUrls: ['./task-list.component.css']
})
export class TaskListComponent implements OnInit {

  todo: Observable<Task[]>;
  inProgress: Observable<Task[]>;
  done: Observable<Task[]>;

  // currentUid: string = this.getUserInfo.getUserId();
  boardId: string;

  // add new task will be in the dialog box
  constructor(private dialog: MatDialog, 
              private store: AngularFirestore, 
              private router: ActivatedRoute,
              private getUserInfo: GetUserinfoService, 
              private snackBarService: SnackbarService) {
    
    // this.currentUid = getUserInfo.getUserId();

    this.boardId = this.router.snapshot.params['bid'];
    console.log(this.boardId)

    this.todo = getObservable(this.store.collection('todo', ref => {
      return ref
      .where("boardId", "==", this.boardId);
    })) as Observable<Task[]>;

    this.inProgress = getObservable(this.store.collection('inProgress', ref => {
      return ref
      .where("boardId", "==", this.boardId);
    })) as Observable<Task[]>;

    this.done = getObservable(this.store.collection('done', ref => {
      return ref
      .where("boardId", "==", this.boardId);
    })) as Observable<Task[]>;

  }

  ngOnInit(): void {
  }

  // for dragging and dropping items between lists and inside list
  drop(event: CdkDragDrop<Task[]> | any): void {
    if (event.previousContainer === event.container) {
      return;
    }
    const item = event.previousContainer.data[event.previousIndex];
    this.store.firestore.runTransaction(() => {
      const promise = Promise.all([
        this.store.collection(event.previousContainer.id).doc(item.id).delete(),
        this.store.collection(event.container.id).add(item),
      ]);
      return promise;
    });
    transferArrayItem(
      event.previousContainer.data,
      event.container.data,
      event.previousIndex,
      event.currentIndex
    );
  }

  newTask(): void{
    const dialogRef = this.dialog.open(TaskDialogComponent, {
      width: '270px',
      data: {
        task: {
          boardId: this.boardId
        }
      }
    });
    dialogRef.afterClosed().subscribe((result: TaskDialogResult) => {
      console.log("Dialog was closed");
      if(result.task.title != undefined) {
        this.store.collection('todo').add(result.task);
        this.snackBarService.openSnackBar(messages.taskCreated, "Dismiss", messages.success);
      }

    }, (error: any) => {
      this.snackBarService.openSnackBar(messages.http500Error, "Dismiss", messages.failure);
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
      if (result.delete) {
        this.store.collection(list).doc(task.id).delete();
        this.snackBarService.openSnackBar(messages.taskDeleted, "Dismiss", messages.success);
      } else {
        this.store.collection(list).doc(task.id).update(task);
        this.snackBarService.openSnackBar(messages.taskUpdated, "Dismiss", messages.success);
      }
    }, (error: any) => {
      this.snackBarService.openSnackBar(messages.http500Error, "Dismiss", messages.failure);
    });
  }

}
