import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LettersFallComponent } from './letters-fall.component';



@NgModule({
  declarations: [LettersFallComponent],
  imports: [
    CommonModule
  ],
  exports: [
    LettersFallComponent
  ]
})
export class LettersFallModule { }
