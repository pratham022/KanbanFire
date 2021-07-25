import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { MatCardModule } from '@angular/material/card';
import { DragDropModule } from '@angular/cdk/drag-drop';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule } from '@angular/material/dialog';
import { MatInputModule } from '@angular/material/input';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatSelectModule } from '@angular/material/select';
import { ClipboardModule } from '@angular/cdk/clipboard';

import { TaskComponent } from './task/task.component';
import { TaskListComponent } from './task-list/task-list.component';
import { TaskDialogComponent } from './task-dialog/task-dialog.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatSnackBarModule } from '@angular/material/snack-bar';

import { environment } from 'src/environments/environment';
import { AngularFireModule } from '@angular/fire';
import { AngularFirestoreModule } from '@angular/fire/firestore';
import { AngularFireAuthModule } from '@angular/fire/auth';
import { SignInComponent } from './sign-in/sign-in.component';
import { SignUpComponent } from './sign-up/sign-up.component';
import { ForgotPasswordComponent } from './forgot-password/forgot-password.component';

import { AuthService } from './services/auth.service';
import { WelcomeComponent } from './welcome/welcome.component';
import { MainNavComponent } from './main-nav/main-nav.component';
import { LayoutModule } from '@angular/cdk/layout';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatListModule } from '@angular/material/list';
import { CreateWorkspaceComponent } from './create-workspace/create-workspace.component';
import { WorkspaceListComponent } from './workspace-list/workspace-list.component';
import { WorkspaceComponent } from './workspace/workspace.component';
import { InviteToWorkspaceComponent } from './invite-to-workspace/invite-to-workspace.component';
import { JoinWorkspaceComponent } from './join-workspace/join-workspace.component';

// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyA2EXK26lgo0XCR3L_DLnzMAXNhMgee80U",
  authDomain: "utility-app-343d6.firebaseapp.com",
  projectId: "utility-app-343d6",
  storageBucket: "utility-app-343d6.appspot.com",
  messagingSenderId: "229741744533",
  appId: "1:229741744533:web:ca43926d365a81c0a1a69c",
  measurementId: "G-VGNHPLG2W3"
};

@NgModule({
  declarations: [
    AppComponent,
    TaskComponent,
    TaskListComponent,
    TaskDialogComponent,
    SignInComponent,
    SignUpComponent,
    ForgotPasswordComponent,
    WelcomeComponent,
    MainNavComponent,
    CreateWorkspaceComponent,
    WorkspaceListComponent,
    WorkspaceComponent,
    InviteToWorkspaceComponent,
    JoinWorkspaceComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,

    MatToolbarModule,
    MatIconModule,
    MatCardModule,
    DragDropModule,
    MatButtonModule,
    MatDialogModule,
    FormsModule,
    MatInputModule,
    ReactiveFormsModule,
    MatToolbarModule,
    MatSnackBarModule,
    MatSelectModule,
    ClipboardModule,

    AngularFireModule.initializeApp(environment.firebase),
    AngularFirestoreModule, 
    AngularFireAuthModule, LayoutModule, MatSidenavModule, MatListModule
    
  ],
  providers: [AuthService],
  bootstrap: [AppComponent]
})
export class AppModule { }
