import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CipConfigurationComponent } from './cip-configuration.component';

describe('CipConfigurationComponent', () => {
  let component: CipConfigurationComponent;
  let fixture: ComponentFixture<CipConfigurationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CipConfigurationComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CipConfigurationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
