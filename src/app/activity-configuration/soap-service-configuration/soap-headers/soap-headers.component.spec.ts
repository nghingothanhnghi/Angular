import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SoapHeadersComponent } from './soap-headers.component';

describe('SoapHeadersComponent', () => {
  let component: SoapHeadersComponent;
  let fixture: ComponentFixture<SoapHeadersComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SoapHeadersComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SoapHeadersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
