import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SoapParametersComponent } from './soap-parameters.component';

describe('SoapParametersComponent', () => {
  let component: SoapParametersComponent;
  let fixture: ComponentFixture<SoapParametersComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SoapParametersComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SoapParametersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
