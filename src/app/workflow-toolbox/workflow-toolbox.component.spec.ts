import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { WorkflowToolboxComponent } from './workflow-toolbox.component';

describe('WorkflowToolboxComponent', () => {
  let component: WorkflowToolboxComponent;
  let fixture: ComponentFixture<WorkflowToolboxComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ WorkflowToolboxComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WorkflowToolboxComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
