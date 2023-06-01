import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ActivateTreeComponent } from './activate-tree.component';

describe('ActivateTreeComponent', () => {
  let component: ActivateTreeComponent;
  let fixture: ComponentFixture<ActivateTreeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ActivateTreeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ActivateTreeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
