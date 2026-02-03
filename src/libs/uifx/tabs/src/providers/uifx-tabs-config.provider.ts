import { Provider } from '@angular/core';
import { UIFX_TABS_CONFIG_TOKEN } from '@uifx/tabs/public-api';
import { TabsConfig } from './../models/uifx-tabs.models';

const DEFAULT_TABS_CONFIG: TabsConfig = {
  variant: 'basic',
  orientation: 'horizontal',
  selectionMode: 'explicit',
  preserveContent: false,
  tabsInLoop: true
};

export function provideUifxTabsConfig(config: Partial<TabsConfig> = {}): Provider {
  return {
    provide: UIFX_TABS_CONFIG_TOKEN,
    useValue: { ...DEFAULT_TABS_CONFIG, ...config }
  };
}
