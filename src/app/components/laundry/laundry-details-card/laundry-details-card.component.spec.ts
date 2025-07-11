import { ComponentFixture, TestBed } from '@angular/core/testing';
import { LaundryDetailsCardComponent } from './laundry-details-card.component';


describe('LaundryDetailsCardComponent', () => {
  let component: LaundryDetailsCardComponent;
  let fixture: ComponentFixture<LaundryDetailsCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LaundryDetailsCardComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LaundryDetailsCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
