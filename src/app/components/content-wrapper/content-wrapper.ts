import { Component } from '@angular/core';

@Component({
  selector: 'content-wrapper, sr-content-wrapper',
  imports: [],
  template: `<ng-content>Content Wrapper Placeholder!</ng-content> `,
  styles: `
    :host {
      max-width: var(--sr-content-wrapper-width);
    }
  `,
  host: {
    class: 'content-wrapper-host block w--full mx--auto',
  }
})
export class ContentWrapper {}
