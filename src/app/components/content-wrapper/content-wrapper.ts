import { Component } from '@angular/core';

@Component({
  selector: 'content-wrapper, sr-content-wrapper',
  imports: [],
  template: `<ng-content>Content Wrapper Placeholder!</ng-content> `,
  styles: `
    :host {
      display: block;
      max-width: var(--sr-content-wrapper-width);
      margin-inline: auto;
    }
  `,
  host: {
    class: 'content-wrapper-host'
  }
})
export class ContentWrapper {}
