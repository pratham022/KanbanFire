import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SignInComponent } from './sign-in/sign-in.component';
import { SignUpComponent } from './sign-up/sign-up.component';
import { TaskListComponent } from './task-list/task-list.component';
import { ForgotPasswordComponent } from './forgot-password/forgot-password.component';
import { AuthGuard } from './auth.guard';
import { WelcomeComponent } from './welcome/welcome.component';
import { WorkspaceListComponent } from './workspace-list/workspace-list.component';
import { BoardListComponent } from './board-list/board-list.component';

const routes: Routes = [
  { path: '', redirectTo: '/sign-in', pathMatch: 'full' },
  { path: 'sign-in', component: SignInComponent },
  { path: 'register-user', component: SignUpComponent },
  { path: 'home', component: WelcomeComponent, canActivate: [AuthGuard] },
  { path: 'forgot-password', component: ForgotPasswordComponent },
  { path: 'workspaces', component: WorkspaceListComponent, canActivate: [AuthGuard] },
  { 
    path: 'workspaces/:id', 
    component: BoardListComponent, 
    canActivate: [AuthGuard],
  },
  { path: 'workspaces/:id/boards/:bid', component: TaskListComponent, canActivate: [AuthGuard]}

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
