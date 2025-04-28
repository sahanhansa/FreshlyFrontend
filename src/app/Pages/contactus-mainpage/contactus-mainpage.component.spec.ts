import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ContactusMainpageComponent } from './contactus-mainpage.component';

describe('ContactusMainpageComponent', () => {
  let component: ContactusMainpageComponent;
  let fixture: ComponentFixture<ContactusMainpageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ContactusMainpageComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ContactusMainpageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
