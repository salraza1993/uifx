import { Component } from '@angular/core';

@Component({
  selector: 'sr-section-wrapper, section-wrapper',
  imports: [],
  templateUrl: './section-wrapper.html',
  styleUrl: './section-wrapper.css',
  host: {
    class: 'section-wrapper-host relative block'
  }
})
export class SectionWrapper {}
