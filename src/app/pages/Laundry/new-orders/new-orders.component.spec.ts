/// <reference types="jasmine" />

import { ComponentFixture, TestBed } from '@angular/core/testing';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { Router } from '@angular/router';
import { of } from 'rxjs';

import { NewOrdersComponent } from './new-orders.component';
import { OrderService } from '../../../services/order.service';

describe('NewOrdersComponent', () => {
  let component: NewOrdersComponent;
  let fixture: ComponentFixture<NewOrdersComponent>;

  beforeEach(async () => {
    const mockOrderService = {
      getNewOrders: jasmine.createSpy().and.returnValue(of([])),
      getSortedOrderIds: jasmine.createSpy().and.returnValue(of([]))
    };

    const mockRouter = {
      navigate: jasmine.createSpy()
    };

    await TestBed.configureTestingModule({
      imports: [NewOrdersComponent],
      providers: [
        { provide: OrderService, useValue: mockOrderService },
        { provide: Router, useValue: mockRouter }
      ],
      schemas: [NO_ERRORS_SCHEMA]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NewOrdersComponent);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
