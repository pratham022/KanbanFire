# KanbanFire

KanbanFire is a task monitoring app for project teams to optimise the flow of work, similar to Trello
This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 12.0.5.


[Live Demo](https://utility-app-343d6.web.app/register-user)

![home](https://firebasestorage.googleapis.com/v0/b/utility-app-343d6.appspot.com/o/home.png?alt=media&token=f2efa128-48bc-470e-be3a-c8d3e89934fe)

![join space](https://firebasestorage.googleapis.com/v0/b/utility-app-343d6.appspot.com/o/join_space.png?alt=media&token=0d3ddc7b-e9b0-44a1-a9b0-30a684ad0d36)

![my workspaces](https://firebasestorage.googleapis.com/v0/b/utility-app-343d6.appspot.com/o/joined_spaces.png?alt=media&token=44a3c783-99e6-472f-93b9-48c5dedd6dab)

![kanban board](https://firebasestorage.googleapis.com/v0/b/utility-app-343d6.appspot.com/o/kanban_board.png?alt=media&token=575682f6-a346-4626-9f6c-e14d3d47b244)

## Features

- Angular 12.x + Firebase
- OAuth and Email/Password Signup with Firebase
- Users can create a Workspace and invite other members for collaboration using a joining code
- Users can create multiple Kanban boards inside a workspace
- Drag & drop using @angular/cdk/drag-drop for tasks


## Usage

1.  Run

- `git clone https://github.com/pratham022/KanbanFire.git`
- `cd KanbanFire`
- `npm install`

2.  Create a project at https://firebase.google.com/ and grab your web config:

3.  Add the config to your Angular environment

#### src/environments/

Update the `environment.prod.ts` and `environment.ts` files. 

```typescript
export const environment = {
  production: false,
  firebase: {
    apiKey: 'APIKEY',
    authDomain: 'DEV-APP.firebaseapp.com',
    databaseURL: 'https://DEV-APP.firebaseio.com',
    projectId: 'DEV-APP',
    storageBucket: 'DEV-APP.appspot.com',
    messagingSenderId: '...',
    appId: '...',
  }
};
```


5.  Run `ng serve`

