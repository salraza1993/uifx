import { TabList } from '@angular/aria/tabs';
import { ChangeDetectionStrategy, Component, inject, input, model } from '@angular/core';
import { UIFX_TABS_CONFIG_TOKEN } from './../tokens/uifx-tabs.tokens';

@Component({
  selector: 'uifx-tab-list',
  imports: [TabList],
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    role: 'tablist',
    class: 'uifx-tab-list-host'
  },
  template: `
    <div
      ngTabList
      [orientation]="orientation()"
      [selectionMode]="selectionMode()"
      [wrap]="wrap()"
      [(selectedTab)]="selectedTab"
    >
      <ng-content />
    </div>
  `
})
export class UifxTabList {
  protected tabs = inject(UIFX_TABS_CONFIG_TOKEN);
  orientation = input<'horizontal' | 'vertical'>('horizontal');
  selectionMode = input<'follow' | 'explicit'>('explicit');
  wrap = input(true);
  selectedTab = model<string | undefined>();
}
