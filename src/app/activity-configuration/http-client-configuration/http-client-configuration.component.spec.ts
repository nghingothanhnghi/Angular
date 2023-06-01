import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HttpClientConfigurationComponent } from './http-client-configuration.component';

describe('HttpClientConfigurationComponent', () => {
  let component: HttpClientConfigurationComponent;
  let fixture: ComponentFixture<HttpClientConfigurationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HttpClientConfigurationComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HttpClientConfigurationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
