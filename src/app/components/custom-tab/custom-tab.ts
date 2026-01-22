import { Tab, TabContent, TabList, TabPanel, Tabs } from '@angular/aria/tabs';
import { NgTemplateOutlet } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  computed,
  contentChild,
  effect,
  input,
  model,
  signal,
  TemplateRef
} from '@angular/core';
import { DEFAULT_CONFIGS, TAB_PLACEHOLDER } from './custom-tab-helper';
import { TabConfig, TabItem } from './custom-tab-model';

@Component({
  selector: 'custom-tab',
  imports: [Tab, Tabs, TabList, TabPanel, TabContent, NgTemplateOutlet],
  templateUrl: './custom-tab.html',
  styleUrl: './custom-tab.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    class: 'custom-tab-host',
  },
})
export class CustomTab {
  private TAB_PLACEHOLDER = signal<TabItem[]>(TAB_PLACEHOLDER);
  private DEFAULT_CONFIGS = signal<TabConfig>(DEFAULT_CONFIGS);

  // -------- Inputs from parent -------- //
  tabConfigs = input<TabConfig>();
  tabs = input.required<TabItem[]>();
  selectedTab = model<string | undefined>();
  tabsTemplate = contentChild<TemplateRef<{ tab: TabItem }>>('tabs');
  tabsContentTemplate = contentChild<TemplateRef<{ tab: TabItem }>>('tabsContent');

  protected configs = computed(() => this.tabConfigs() || this.DEFAULT_CONFIGS());
  protected resolvedTabs = computed(() => {
    const tabsList = this.tabs();
    if (tabsList?.length) {
      return tabsList;
    }
    return this.TAB_PLACEHOLDER();
  });

  protected defaultActiveTab = computed(() => {
    const active = this.selectedTab() || this.tabs()?.find((tab) => tab.selected)?.value;
    if (active) return active;

    const tabs = this.resolvedTabs();
    return tabs?.[0]?.value ?? '';
  });

  protected onSelectTab(tabItem: TabItem): void {
    if(this.configs().selectionMode === 'explicit' && !tabItem.disabled) {
      this.selectedTab.set(tabItem.value);
    }
  }

  private syncSelectedTab = effect(() => {
    const defaultTab = this.defaultActiveTab();
    if (defaultTab && !this.selectedTab()) {
      this.selectedTab.set(defaultTab);
    }
  });

  protected tabStyleTypeClasses(): { [key: string]: boolean } {
    return {
      'tab-variant--box': this.configs().variant === 'boxed',
      'tab-variant--underline': this.configs().variant === 'underline',
      'tab-variant--pill': this.configs().variant === 'pills',
      'tab-variant--basic': this.configs().variant === 'basic',
    };
  }

  protected tabItemDynamicClasses(tab: TabItem): { [key: string]: boolean } {
    return {
      'tab-item--box': this.configs().variant === 'boxed',
      'tab-item--underline': this.configs().variant === 'underline',
      'tab-item--pill': this.configs().variant === 'pills',
      'tab-item--basic': this.configs().variant === 'basic',
      'tab-item--selected': this.selectedTab() === tab.value,
      [this.configs().activeTabClass || '']: this.selectedTab() === tab.value,
      [this.configs().disabledTabClass || '']: !!tab.disabled,
    };
  }
}
