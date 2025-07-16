import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NavbarOrderComponent } from './navbar-order.component';

describe('NavbarOrderComponent', () => {
  let component: NavbarOrderComponent;
  let fixture: ComponentFixture<NavbarOrderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NavbarOrderComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NavbarOrderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
