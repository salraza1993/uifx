import { Component, input } from '@angular/core';

@Component({
  selector: 'tab-content-item',
  imports: [],
  template: ` <ng-content></ng-content> `,
  styleUrl: '../tabs-wrapper.css',
  host: {
    class: 'tab-content-item-host',
  },
})
export class TabContentItem {
  value = input<any>(0);
}
