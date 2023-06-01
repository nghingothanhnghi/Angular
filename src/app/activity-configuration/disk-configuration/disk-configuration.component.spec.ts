import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DiskConfigurationComponent } from './disk-configuration.component';

describe('DiskConfigurationComponent', () => {
  let component: DiskConfigurationComponent;
  let fixture: ComponentFixture<DiskConfigurationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DiskConfigurationComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DiskConfigurationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
