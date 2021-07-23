import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class GetUserinfoService {

  constructor() { }


  getUserId(): string {
    
    let user = null;
    try {
      user = JSON.parse(localStorage.getItem('user') || '')
    } catch(e) {
      user = null;
    }
    if(user === '') user = null;

    if(user == null) 
      return '';
    else {
      return user.uid;
    }
  }
}
