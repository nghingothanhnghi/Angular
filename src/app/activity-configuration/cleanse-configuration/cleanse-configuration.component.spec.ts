import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CleanseConfigurationComponent } from './cleanse-configuration.component';

describe('CleanseConfigurationComponent', () => {
  let component: CleanseConfigurationComponent;
  let fixture: ComponentFixture<CleanseConfigurationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CleanseConfigurationComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CleanseConfigurationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
