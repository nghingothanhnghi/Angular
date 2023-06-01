import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { JsplumbControlsComponent } from './jsplumb-controls.component';

describe('JsplumbControlsComponent', () => {
  let component: JsplumbControlsComponent;
  let fixture: ComponentFixture<JsplumbControlsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ JsplumbControlsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(JsplumbControlsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
