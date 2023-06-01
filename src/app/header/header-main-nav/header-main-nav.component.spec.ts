import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HeaderMainNavComponent } from './header-main-nav.component';

describe('HeaderMainNavComponent', () => {
  let component: HeaderMainNavComponent;
  let fixture: ComponentFixture<HeaderMainNavComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HeaderMainNavComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HeaderMainNavComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
