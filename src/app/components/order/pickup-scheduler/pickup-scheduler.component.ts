import { Component, EventEmitter, Output, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-pickup-scheduler',
  standalone: true,
  imports: [
    FormsModule
  ],
  templateUrl: './pickup-scheduler.component.html'
})
export class PickupSchedulerComponent implements OnInit {
  @Output() confirm = new EventEmitter<Date>();
  @Output() cancel = new EventEmitter<void>();

  minDateTime = '';
  maxDateTime = '';
  selectedDateTime = '';

  ngOnInit() {
    const now = new Date();
    now.setMinutes(0, 0, 0); // round to the hour
    const min = new Date(now.getTime() + 60 * 60 * 1000); // 1 hour from now
    const defaultDt = new Date(now.getTime() + 24 * 60 * 60 * 1000); // 1 day from now
    const max = new Date(now.getTime() + 14 * 24 * 60 * 60 * 1000); // 2 weeks from now

    this.minDateTime = this.toInputValue(min);
    this.maxDateTime = this.toInputValue(max);
    this.selectedDateTime = this.toInputValue(defaultDt);
  }

  toInputValue(date: Date): string {
    // Format as yyyy-MM-ddTHH:mm for input[type="datetime-local"]
    const pad = (n: number) => n.toString().padStart(2, '0');
    return `${date.getFullYear()}-${pad(date.getMonth() + 1)}-${pad(date.getDate())}T${pad(date.getHours())}:${pad(date.getMinutes())}`;
  }

  onConfirm() {
    this.confirm.emit(new Date(this.selectedDateTime));
  }
}
