import { Tabs } from '@angular/aria/tabs';
import { ChangeDetectionStrategy, Component, model } from '@angular/core';
import { createTabsState } from './../states/uifx-tabs-state';
import { UIFX_TABS_CONFIG_TOKEN } from './../tokens/uifx-tabs.tokens';

@Component({
  selector: 'uifx-tabs',
  imports: [Tabs],
  providers: [
    {
      provide: UIFX_TABS_CONFIG_TOKEN,
      useFactory: () => createTabsState()
    }
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: ` <div ngTabs><ng-content /></div> `,
  styleUrls: ['../styles/uifx-tabs.css'],
  host: { class: 'uifx-tabs-host' }
})
export class UifxTabs {
  /** Controlled / uncontrolled */
  value = model<string>();
}
