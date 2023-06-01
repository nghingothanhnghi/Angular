import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HttpClientNodeComponent } from './http-client-node.component';

describe('HttpClientNodeComponent', () => {
  let component: HttpClientNodeComponent;
  let fixture: ComponentFixture<HttpClientNodeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HttpClientNodeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HttpClientNodeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
