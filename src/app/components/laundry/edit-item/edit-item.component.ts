import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-edit-item',
  standalone: true,
  imports: [CommonModule, FormsModule,RouterModule ],
  templateUrl: './edit-item.component.html',
})
export class EditItemComponent {
   imageUrl: string = 'assets/shirt.jpg';

item = {
    name: 'Shirt',
    description: 'Cotton,Linen',
    services: [
      { name: 'Dry Clean', price: 250 }
    ]
  };

  addService() {
    if (this.item.services.length < 3) {
      this.item.services.push({ name: '', price: 0 });
    }
  }

  removeService(index: number) {
    this.item.services.splice(index, 1);
  }

    onImageSelected(event: Event) {
    const file = (event.target as HTMLInputElement)?.files?.[0];
    if (file) {
      this.imageUrl = URL.createObjectURL(file);
    }
  }

}

