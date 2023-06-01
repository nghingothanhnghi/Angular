import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DataProcessorNodeComponent } from './data-processor-node.component';

describe('DataProcessorNodeComponent', () => {
  let component: DataProcessorNodeComponent;
  let fixture: ComponentFixture<DataProcessorNodeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DataProcessorNodeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DataProcessorNodeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
