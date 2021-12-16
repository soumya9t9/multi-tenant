import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TenantSubLandingComponent } from './tenant-sub-landing.component';

describe('TenantSubLandingComponent', () => {
  let component: TenantSubLandingComponent;
  let fixture: ComponentFixture<TenantSubLandingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TenantSubLandingComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TenantSubLandingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
