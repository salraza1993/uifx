import { Component } from '@angular/core';

@Component({
  selector: 'tabs-body',
  imports: [],
  template: `
    <div class="tabs-body-content">
      <ng-content></ng-content>
    </div>
  `,
  styleUrl: '../tabs-wrapper.css',
})
export class TabsBody {}
