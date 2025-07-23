import { Component, EventEmitter, Output, OnInit, Input } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-pickup-scheduler',
  standalone: true,
  imports: [
    FormsModule,
    CommonModule
  ],
  templateUrl: './pickup-scheduler.component.html'
})
export class PickupSchedulerComponent implements OnInit {
  @Input() isVisible = false;
  @Output() confirm = new EventEmitter<Date>();
  @Output() cancel = new EventEmitter<void>();

  minDateTime = '';
  maxDateTime = '';
  selectedDateTime = '';
  isTimeInvalid = false;

  ngOnInit() {
    this.initializeDateTime();
  }

  initializeDateTime() {
    const now = new Date();
    let minDate = new Date(now);

    // If current time is past 6 PM, start scheduling from tomorrow 6 AM
    if (now.getHours() >= 18) {
      minDate.setDate(now.getDate() + 1);
      minDate.setHours(6, 0, 0, 0);
    } 
    // If current time is before 6 AM, start scheduling from today 6 AM
    else if (now.getHours() < 6) {
      minDate.setHours(6, 0, 0, 0);
    } 
    // Otherwise, the minimum is the current time
    else {
        // Optional: round up to the next 30-minute interval
        const minutes = now.getMinutes();
        const roundedMinutes = minutes < 30 ? 30 : 60;
        minDate.setMinutes(roundedMinutes, 0, 0);
        if(roundedMinutes === 60) minDate.setHours(minDate.getHours() + 1);
    }

    // Set the default pickup time to be the minimum possible time
    this.selectedDateTime = this.toInputValue(minDate);

    // Max pickup date is 2 weeks from now at 6 PM
    const maxDate = new Date(now.getTime() + 14 * 24 * 60 * 60 * 1000);
    maxDate.setHours(18, 0, 0, 0);

    this.minDateTime = this.toInputValue(minDate);
    this.maxDateTime = this.toInputValue(maxDate);
    this.validateTime();
  }

  validateTime() {
    if (!this.selectedDateTime) {
      this.isTimeInvalid = false;
      return;
    }
    const selectedHour = new Date(this.selectedDateTime).getHours();
    // Time must be between 6 AM (inclusive) and 6 PM (inclusive)
    this.isTimeInvalid = selectedHour < 6 || selectedHour >= 18;
  }

  toInputValue(date: Date): string {
    const pad = (n: number) => n.toString().padStart(2, '0');
    return `${date.getFullYear()}-${pad(date.getMonth() + 1)}-${pad(date.getDate())}T${pad(date.getHours())}:${pad(date.getMinutes())}`;
  }

  onConfirm() {
    if (!this.isTimeInvalid) {
      this.confirm.emit(new Date(this.selectedDateTime));
    }
  }
}
