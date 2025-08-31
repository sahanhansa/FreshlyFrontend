import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
    selector: 'app-contact-prompt',
    template: `
  <div class=" flex justify-between  items-center bg-[#5E616A] rounded-[80px] px-8 py-6 max-w-2xl mx-auto my-20">
  <!-- Image circle partly outside -->
  <div class="">
    <img 
      src="assets/images/landing/THIN.png" 
      alt="Deciding how to get started"
      class="w-60 h-60 object-contain"
    >
  </div>



  <!-- Text & button -->
  <div class="flex flex-col">
    <p class="text-white text-[40px] font-semibold text-center md:text-left mb-4 md:mb-0">
      Hard time deciding<br>how to get started?
    </p>
    <button 
      class="bg-gradient-to-r from-blue-400 to-blue-600 text-white px-6 py-2 rounded-full text-base hover:from-blue-500 hover:to-blue-700 transition-colors w-fit"
      (click)="contactUs()"
    >
      Contact us
    </button>
  </div>
</div>

  `,
    styles: []
})
export class ContactPromptComponent {
    constructor(private router: Router) {}

    contactUs() {
        // Navigate to customer contact page
        this.router.navigate(['/cus-home/contact']);
    }
}
