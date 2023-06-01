import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CleanseRulesComponent } from './cleanse-rules.component';

describe('CleanseRulesComponent', () => {
  let component: CleanseRulesComponent;
  let fixture: ComponentFixture<CleanseRulesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CleanseRulesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CleanseRulesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
