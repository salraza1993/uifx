import { NgTemplateOutlet } from '@angular/common';
import { Component, input, TemplateRef } from '@angular/core';

@Component({
  selector: 'sr-hero-title, hero-title',
  imports: [NgTemplateOutlet],
  templateUrl: './hero-title.html',
  styleUrl: './hero-title.css',
  host: {
    class: 'hero-title-host'
  }
})
export class HeroTitle {
  icon = input<TemplateRef<unknown>>();
}
