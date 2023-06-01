import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { StartConfigurationComponent } from './start-configuration.component';

describe('StartConfigurationComponent', () => {
  let component: StartConfigurationComponent;
  let fixture: ComponentFixture<StartConfigurationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ StartConfigurationComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StartConfigurationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
