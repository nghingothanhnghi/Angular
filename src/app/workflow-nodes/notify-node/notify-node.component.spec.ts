import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NotifyNodeComponent } from './notify-node.component';

describe('NotifyNodeComponent', () => {
  let component: NotifyNodeComponent;
  let fixture: ComponentFixture<NotifyNodeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NotifyNodeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NotifyNodeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
