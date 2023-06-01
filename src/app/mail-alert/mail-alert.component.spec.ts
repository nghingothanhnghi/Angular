import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MailAlertComponent } from './mail-alert.component';

describe('MailAlertComponent', () => {
  let component: MailAlertComponent;
  let fixture: ComponentFixture<MailAlertComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MailAlertComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MailAlertComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
