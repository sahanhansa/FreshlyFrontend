import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-add-item',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './add-item.component.html',
  styleUrls: ['./add-item.component.scss']
})
export class AddItemComponent {
  imageUrl: string = '';

item = {
    name: '',
    description: '',
    services: [
      { name: '', price: 0 }
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
