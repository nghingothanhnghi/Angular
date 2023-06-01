import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MapParametersComponent } from './map-parameters.component';

describe('MapParametersComponent', () => {
  let component: MapParametersComponent;
  let fixture: ComponentFixture<MapParametersComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MapParametersComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MapParametersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
