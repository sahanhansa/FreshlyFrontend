import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ItemCategorySelectionComponent } from './item-category-selection.component';

describe('ItemCategorySelectionComponent', () => {
  let component: ItemCategorySelectionComponent;
  let fixture: ComponentFixture<ItemCategorySelectionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ItemCategorySelectionComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ItemCategorySelectionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
