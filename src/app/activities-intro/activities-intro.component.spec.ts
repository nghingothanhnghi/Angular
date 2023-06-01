import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ActivitiesIntroComponent } from './activities-intro.component';

describe('ActivitiesIntroComponent', () => {
  let component: ActivitiesIntroComponent;
  let fixture: ComponentFixture<ActivitiesIntroComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ActivitiesIntroComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ActivitiesIntroComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
