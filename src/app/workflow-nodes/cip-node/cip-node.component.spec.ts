import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CipNodeComponent } from './cip-node.component';

describe('CipNodeComponent', () => {
  let component: CipNodeComponent;
  let fixture: ComponentFixture<CipNodeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CipNodeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CipNodeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
