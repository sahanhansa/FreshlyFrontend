import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';

import { WhoAreYouComponent } from './whoareyou.component';

describe('WhoAreYouComponent', () => {
  let component: WhoAreYouComponent;
  let fixture: ComponentFixture<WhoAreYouComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [WhoAreYouComponent, RouterTestingModule]
    })
    .compileComponents();

    fixture = TestBed.createComponent(WhoAreYouComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
