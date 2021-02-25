import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PricewoikSummaryComponent } from './pricewoik-summary.component';

describe('PricewoikSummaryComponent', () => {
  let component: PricewoikSummaryComponent;
  let fixture: ComponentFixture<PricewoikSummaryComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PricewoikSummaryComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PricewoikSummaryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
