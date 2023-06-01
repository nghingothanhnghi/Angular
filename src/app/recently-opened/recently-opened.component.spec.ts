import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RecentlyOpenedComponent } from './recently-opened.component';

describe('RecentlyOpenedComponent', () => {
  let component: RecentlyOpenedComponent;
  let fixture: ComponentFixture<RecentlyOpenedComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RecentlyOpenedComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RecentlyOpenedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
