import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SoapServiceConfigurationComponent } from './soap-service-configuration.component';

describe('SoapServiceConfigurationComponent', () => {
  let component: SoapServiceConfigurationComponent;
  let fixture: ComponentFixture<SoapServiceConfigurationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SoapServiceConfigurationComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SoapServiceConfigurationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
