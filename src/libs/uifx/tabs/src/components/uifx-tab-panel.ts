import { TabContent, TabPanel } from '@angular/aria/tabs';
import { ChangeDetectionStrategy, Component, input } from '@angular/core';

@Component({
  selector: 'uifx-tab-panel',
  imports: [TabPanel, TabContent],
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    role: 'tabpanel',
    class: 'uifx-tab-panel-host uifx-tab-panel-item'
  },
  template: `
    <div ngTabPanel [value]="value()" [preserveContent]="preserveContent()">
      <ng-template ngTabContent>
        <ng-content />
      </ng-template>
    </div>
  `
})
export class UifxTabPanel {
  value = input.required<string>();
  preserveContent = input(false);
}
