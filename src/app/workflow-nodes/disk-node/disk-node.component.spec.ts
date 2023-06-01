import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DiskNodeComponent } from './disk-node.component';

describe('DiskNodeComponent', () => {
  let component: DiskNodeComponent;
  let fixture: ComponentFixture<DiskNodeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DiskNodeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DiskNodeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
