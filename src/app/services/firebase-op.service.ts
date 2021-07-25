import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument } from '@angular/fire/firestore';
import { Subject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class FirebaseOpService {

  subject = new Subject<any>();

  constructor(private store: AngularFirestore) { 

  }

  fetchDocumentUsingId(code: string): void {
    this.store.collection('workspaces').doc(code).valueChanges().subscribe((data: any) => {
      this.subject.next(data);
    }, (error) => {
      // error
    })
  }

  getDocumentByUsingId(code: string): Observable<any> {
    return this.subject.asObservable();
  }
}
