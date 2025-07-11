import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ContactusHeaderComponent } from './contactus-header.component';

describe('ContactusHeaderComponent', () => {
  let component: ContactusHeaderComponent;
  let fixture: ComponentFixture<ContactusHeaderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ContactusHeaderComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ContactusHeaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
