import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormControl } from '@angular/forms';
import { GarmentTypeService } from '../../../services/garment-type.service';

@Component({
  selector: 'app-item-card',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './item-card.component.html',
  styleUrls: ['./item-card.component.css']
})
export class ItemCardComponent implements OnChanges {
  @Input() item: any;

  garmentTypes: string[] = [];
  washMethods = ['Wash & Dry', 'Iron & Fold'];

  selectedGarment = new FormControl('');
  selectedWashMethod = new FormControl(this.washMethods[0]);
  selectedQuantity = new FormControl(1);

  constructor(private garmentTypeService: GarmentTypeService) {}

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['item'] && this.item) {
      this.garmentTypes = this.garmentTypeService.getGarmentTypes(this.item.name);
      this.selectedGarment.setValue(this.garmentTypes[0]);
    }
  }
}