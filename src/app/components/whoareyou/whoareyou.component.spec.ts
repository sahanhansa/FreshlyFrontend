import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WhoareyouComponent } from './whoareyou.component';

describe('WhoareyouComponent', () => {
  let component: WhoareyouComponent;
  let fixture: ComponentFixture<WhoareyouComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [WhoareyouComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(WhoareyouComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
