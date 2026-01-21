import { TabList } from '@angular/aria/tabs';
import { Component, input } from '@angular/core';

@Component({
  selector: 'tabs-header',
  imports: [TabList],
  template: `
    <div
      ngTabList
      class="tabs-header-content"
      [orientation]="orientation()"
      [selectedTab]="activeTab()"
    >
      <ng-content select="tab-item"></ng-content>
    </div>
  `,
  styleUrl: '../tabs-wrapper.css',
  host: {
    class: 'tabs-header-host',

    '[attr.aria-orientation]': 'orientation()',
  },
})
export class TabsHeader {
  activeTab = input<any>(0);
  orientation = input<'horizontal' | 'vertical'>('horizontal');
}
