import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HttpClientParametersComponent } from './http-client-parameters.component';

describe('HttpClientParametersComponent', () => {
  let component: HttpClientParametersComponent;
  let fixture: ComponentFixture<HttpClientParametersComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HttpClientParametersComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HttpClientParametersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
