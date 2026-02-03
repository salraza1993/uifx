import { Tab, TabContent, TabList, TabPanel, Tabs } from '@angular/aria/tabs';
import { NgTemplateOutlet } from '@angular/common';
import {
  booleanAttribute,
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
import { CustomTabPanel } from './custom-tab-panel';
import { CustomTabPanels } from './custom-tab-panels';
import { CustomTablist } from './custom-tablist';
import { DEFAULT_CONFIGS, TAB_PLACEHOLDER } from './helpers/custom-tab-helper';
import { TabConfig, TabItem } from './models/custom-tab-model';

@Component({
  selector: 'custom-tab',
  imports: [Tab, Tabs, TabList, TabPanel, TabContent, NgTemplateOutlet],
  templateUrl: './custom-tab.html',
  styleUrl: './custom-tab.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    class: 'custom-tab-host',
    '[class.custom-tab--fluid]': 'fluid()'
  }
})
export class CustomTab {
  private TAB_PLACEHOLDER = signal<TabItem[]>(TAB_PLACEHOLDER);
  private DEFAULT_CONFIGS = signal<TabConfig>(DEFAULT_CONFIGS);

  // -------- Inputs from parent -------- //
  tabConfigs = input<TabConfig>();
  tabs = input<TabItem[]>([]);
  selectedTab = model<string | undefined>();
  tabsTemplate = contentChild<TemplateRef<{ tab: TabItem }>>('tabs');
  tabsContentTemplate = contentChild<TemplateRef<{ tab: TabItem }>>('tabsContent');
  iconTemplate = contentChild<TemplateRef<{ tab: TabItem }>>('icon');
  iconStart = contentChild<TemplateRef<{ tab: TabItem }>>('iconStart');
  iconEnd = contentChild<TemplateRef<{ tab: TabItem }>>('iconEnd');
  tabPanels = contentChild(CustomTabPanels);
  customTablist = contentChild(CustomTablist);
  fluid = input(false, { transform: booleanAttribute });

  protected configs = computed(() => this.tabConfigs() || this.DEFAULT_CONFIGS());
  protected tabsInLoop = computed(() => this.configs().tabsInLoop || false);
  protected selectionMode = computed(() => this.configs().selectionMode || 'follow');
  protected orientation = computed(() => this.configs().orientation || 'horizontal');
  protected preserveContent = computed(() => this.configs().preserveContent || false);

  protected resolvedTabs = computed(() => {
    const tablist = this.customTablist();
    if (tablist) {
      const items = tablist.getTabItems();
      if (items.length) {
        return items;
      }
    }
    const tabsList = this.tabs();
    if (tabsList?.length) {
      return tabsList;
    }
    return this.TAB_PLACEHOLDER();
  });

  protected defaultActiveTab = computed(() => {
    const active = this.selectedTab() || this.tabs()?.find(tab => tab.selected)?.value;
    if (active) return active;

    const tabs = this.resolvedTabs();
    return tabs?.[0]?.value ?? '';
  });

  protected onSelectTab(tabItem: TabItem): void {
    if (this.configs().selectionMode === 'explicit' && !tabItem.disabled) {
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
      'tab-variant--basic': this.configs().variant === 'basic'
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
      [this.configs().disabledTabClass || '']: !!tab.disabled
    };
  }

  protected panelFor(value: string): CustomTabPanel | undefined {
    const panels = this.tabPanels();
    return panels ? panels.panelFor(value) : undefined;
  }
}
