/// <reference types="jasmine" />

import { ComponentFixture, TestBed } from '@angular/core/testing';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { Router } from '@angular/router';
import { of } from 'rxjs';

import { ProcessingOrdersComponent } from './processing-orders.component';
import { OrderService } from '../../../services/order.service';

describe('ProcessingOrdersComponent', () => {
  let component: ProcessingOrdersComponent;
  let fixture: ComponentFixture<ProcessingOrdersComponent>;

  beforeEach(async () => {
    const mockOrderService = {
      getProcessingOrders: jasmine.createSpy().and.returnValue(of([])),
      getSortedOrderIds: jasmine.createSpy().and.returnValue(of([]))
    };

    const mockRouter = {
      navigate: jasmine.createSpy()
    };

    await TestBed.configureTestingModule({
      imports: [ProcessingOrdersComponent],
      providers: [
        { provide: OrderService, useValue: mockOrderService },
        { provide: Router, useValue: mockRouter }
      ],
      schemas: [NO_ERRORS_SCHEMA]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ProcessingOrdersComponent);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
