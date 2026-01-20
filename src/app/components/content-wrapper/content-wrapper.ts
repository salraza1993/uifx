import { Component } from '@angular/core';

@Component({
  selector: 'sr-content-wrapper',
  imports: [],
  template: `<ng-content>Content Wrapper Placeholder!</ng-content> `,
  styles: `
    :host {
      display: block;
      max-width: var(--sr-content-wrapper-width);
      margin-inline: auto;
      padding: var(--sr-padding-md);
    }
  `,
})
export class ContentWrapper {}
