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
  TemplateRef,
} from '@angular/core';

export interface TabItem {
  id: any;
  label: string;
  value: string;
  selected?: boolean;
  icon?: string;
  disabled?: boolean;
  command?: () => void;
}

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
  protected tabsPlaceholder = signal<TabItem[]>([
    { id: 'home', label: 'Home', value: 'home', icon: 'home' },
    { id: 'profile', label: 'Profile', value: 'profile', icon: 'user' },
    { id: 'messages', label: 'Messages', value: 'messages', icon: 'envelope' },
  ]);
  // configs
  orientation = input<'horizontal' | 'vertical'>('horizontal');
  tabsInLoop = input(false, { transform: booleanAttribute });
  selectionMode = input<'follow' | 'explicit'>('follow');
  softDisabled = input(true, { transform: booleanAttribute });

  tabs = input<TabItem[]>();
  tabsTemplate = contentChild<TemplateRef<{ tab: TabItem }>>('tabs');
  tabsContentTemplate = contentChild<TemplateRef<{ tab: TabItem }>>('tabsContent');
  selectedTab = model<string | undefined>();
  showDefaultContent = input(true, { transform: booleanAttribute });
  preserveContent = input(false, { transform: booleanAttribute });

  protected resolvedTabs = computed(() => {
    const tabsList = this.tabs();
    if (tabsList?.length) {
      return tabsList;
    }
    return this.tabsPlaceholder();
  });

  protected defaultActiveTab = computed(() => {
    const active = this.selectedTab() || this.tabs()?.find((tab) => tab.selected)?.value;
    if (active) return active;

    const tabs = this.resolvedTabs();
    return tabs?.[0]?.value ?? '';
  });

  protected onSelectTab(tabItem: TabItem): void {
    if(this.selectionMode() === 'explicit' && !tabItem.disabled) {
      this.selectedTab.set(tabItem.value);
    }
  }

  private syncSelectedTab = effect(() => {
    const defaultTab = this.defaultActiveTab();
    if (defaultTab && !this.selectedTab()) {
      this.selectedTab.set(defaultTab);
    }
  });
}
