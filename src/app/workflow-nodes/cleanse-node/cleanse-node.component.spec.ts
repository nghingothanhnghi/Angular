import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CleanseNodeComponent } from './cleanse-node.component';

describe('CleanseNodeComponent', () => {
  let component: CleanseNodeComponent;
  let fixture: ComponentFixture<CleanseNodeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CleanseNodeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CleanseNodeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
