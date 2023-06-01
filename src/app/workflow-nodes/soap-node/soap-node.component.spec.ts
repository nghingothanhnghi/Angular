import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SoapNodeComponent } from './soap-node.component';

describe('SoapNodeComponent', () => {
  let component: SoapNodeComponent;
  let fixture: ComponentFixture<SoapNodeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SoapNodeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SoapNodeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
