import { ComponentFixture, TestBed } from '@angular/core/testing';

import { JoinWorkspaceComponent } from './join-workspace.component';

describe('JoinWorkspaceComponent', () => {
  let component: JoinWorkspaceComponent;
  let fixture: ComponentFixture<JoinWorkspaceComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ JoinWorkspaceComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(JoinWorkspaceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
