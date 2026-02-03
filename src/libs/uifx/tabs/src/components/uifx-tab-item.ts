import { Tab } from '@angular/aria/tabs';
import { ChangeDetectionStrategy, Component, input } from '@angular/core';

@Component({
  selector: 'uifx-tab-item',
  imports: [Tab],
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    role: 'tab',
    class: 'uifx-tab-host uifx-tab-item'
  },
  template: `
    <div ngTab [value]="value()" [disabled]="disabled()">
      <ng-content />
    </div>
  `
})
export class UifxTabItem {
  value = input.required<string>();
  disabled = input(false);
}
