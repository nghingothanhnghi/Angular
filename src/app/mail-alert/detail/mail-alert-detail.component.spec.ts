import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MailAlertDetailComponent } from './mail-alert-detail.component';

describe('MailAlertDetailComponent', () => {
  let component: MailAlertDetailComponent;
  let fixture: ComponentFixture<MailAlertDetailComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MailAlertDetailComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MailAlertDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
