import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { WorkflowNodesComponent } from './workflow-nodes.component';

describe('WorkflowNodesComponent', () => {
  let component: WorkflowNodesComponent;
  let fixture: ComponentFixture<WorkflowNodesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ WorkflowNodesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WorkflowNodesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
