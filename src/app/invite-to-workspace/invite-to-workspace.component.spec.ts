import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InviteToWorkspaceComponent } from './invite-to-workspace.component';

describe('InviteToWorkspaceComponent', () => {
  let component: InviteToWorkspaceComponent;
  let fixture: ComponentFixture<InviteToWorkspaceComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ InviteToWorkspaceComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(InviteToWorkspaceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
