import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ElementRulesComponent } from './element-rules.component';

describe('ElementRulesComponent', () => {
  let component: ElementRulesComponent;
  let fixture: ComponentFixture<ElementRulesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ElementRulesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ElementRulesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
