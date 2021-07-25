import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Workspace } from '../interfaces/workspace';
import { Router } from '@angular/router';

@Component({
  selector: 'app-workspace',
  templateUrl: './workspace.component.html',
  styleUrls: ['./workspace.component.css']
})
export class WorkspaceComponent implements OnInit {

  @Input() workspace: Workspace;
  @Output() edit = new EventEmitter<Workspace>(); 
  constructor(private router: Router) { 
    this.workspace = {
      name: '',
      description: '',
      id: '',
      users: [], 
      userNames: []
    }
  }

  ngOnInit(): void {
  }

  editWorkspace() {
    this.edit.emit(this.workspace);
  }

  openBoards() {
    this.router.navigate([`workspaces/${this.workspace.id}`])
  }

}
