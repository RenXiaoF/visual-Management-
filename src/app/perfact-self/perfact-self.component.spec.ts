import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PerfactSelfComponent } from './perfact-self.component';

describe('PerfactSelfComponent', () => {
  let component: PerfactSelfComponent;
  let fixture: ComponentFixture<PerfactSelfComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PerfactSelfComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PerfactSelfComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
