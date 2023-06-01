import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DataProcessorConfigurationComponent } from './data-processor-configuration.component';

describe('DataProcessorConfigurationComponent', () => {
  let component: DataProcessorConfigurationComponent;
  let fixture: ComponentFixture<DataProcessorConfigurationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DataProcessorConfigurationComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DataProcessorConfigurationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
