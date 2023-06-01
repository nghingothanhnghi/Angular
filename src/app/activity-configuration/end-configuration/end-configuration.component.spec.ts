import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EndConfigurationComponent } from './end-configuration.component';

describe('EndConfigurationComponent', () => {
  let component: EndConfigurationComponent;
  let fixture: ComponentFixture<EndConfigurationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EndConfigurationComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EndConfigurationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
