import { Component, signal } from '@angular/core';
import { ContentWrapper } from '@app/components/content-wrapper/content-wrapper';

@Component({
  selector: 'sr-footer, footer',
  imports: [ContentWrapper],
  templateUrl: './footer.html',
  styleUrl: './footer.css',
  host: {
    class: 'sr-footer-host block relative py--3xl text--center my-start--2xl'
  }
})
export class Footer {
  currentYear = signal(new Date().getFullYear());
}
