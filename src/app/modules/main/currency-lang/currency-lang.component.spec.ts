import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CurrencyLangComponent } from './currency-lang.component';

describe('CurrencyLangComponent', () => {
  let component: CurrencyLangComponent;
  let fixture: ComponentFixture<CurrencyLangComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CurrencyLangComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CurrencyLangComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
