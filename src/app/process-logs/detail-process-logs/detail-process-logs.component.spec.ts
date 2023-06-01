import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DetailProcessLogsComponent } from './detail-process-logs.component';

describe('DetailProcessLogsComponent', () => {
  let component: DetailProcessLogsComponent;
  let fixture: ComponentFixture<DetailProcessLogsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DetailProcessLogsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DetailProcessLogsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
