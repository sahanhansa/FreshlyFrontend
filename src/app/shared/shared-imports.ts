// Import common Angular modules used across components
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

// Export the array of common imports for standalone components
export const SharedImports = [
  CommonModule,
  RouterModule,
  FormsModule,
  ReactiveFormsModule,
  HttpClientModule
];

// For backward compatibility, also keep the module class
import { NgModule } from '@angular/core';
@NgModule({
  imports: SharedImports,
  exports: SharedImports
})
export class SharedImportsModule {}