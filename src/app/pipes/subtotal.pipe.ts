import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'subtotal',
  standalone: true
})
export class SubtotalPipe implements PipeTransform {
  transform(items: any[]): number {
    return items.reduce((sum, item) => sum + item.totalPrice, 0);
  }
} 