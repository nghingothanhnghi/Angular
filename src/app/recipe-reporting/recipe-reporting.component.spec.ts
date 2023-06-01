import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RecipeReportingComponent } from './recipe-reporting.component';

describe('RecipeReportingComponent', () => {
  let component: RecipeReportingComponent;
  let fixture: ComponentFixture<RecipeReportingComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RecipeReportingComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RecipeReportingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
