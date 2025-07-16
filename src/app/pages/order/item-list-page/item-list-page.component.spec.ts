import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ItemListPageComponent } from './item-list-page.component';

describe('ItemListPageComponent', () => {
  let component: ItemListPageComponent;
  let fixture: ComponentFixture<ItemListPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ItemListPageComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ItemListPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
