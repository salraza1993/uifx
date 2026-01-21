import { Tab } from '@angular/aria/tabs';
import { Component, input } from '@angular/core';

@Component({
  selector: 'tab-item',
  imports: [Tab],
  template: `
    <div className="tab-item-content" [value]="value()" ngTab [disabled]="disabled()">
      <ng-content></ng-content>
    </div>
  `,
  styleUrl: '../tabs-wrapper.css',
  host: {
    class: 'tab-item-host',
  },
})
export class TabItem {
  value = input<any>(0);
  disabled = input<boolean>(false);
}
