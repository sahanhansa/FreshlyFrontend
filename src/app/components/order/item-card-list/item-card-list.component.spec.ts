import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ItemCardListComponent } from './item-card-list.component';

describe('ItemCardListComponent', () => {
  let component: ItemCardListComponent;
  let fixture: ComponentFixture<ItemCardListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ItemCardListComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ItemCardListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
