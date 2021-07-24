import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Workspace } from '../interfaces/workspace';

@Component({
  selector: 'app-workspace',
  templateUrl: './workspace.component.html',
  styleUrls: ['./workspace.component.css']
})
export class WorkspaceComponent implements OnInit {

  @Input() workspace: Workspace;
  @Output() edit = new EventEmitter<Workspace>(); 
  constructor() { 
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

}
