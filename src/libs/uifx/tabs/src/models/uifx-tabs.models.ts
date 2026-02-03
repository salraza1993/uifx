import { Signal, TemplateRef } from '@angular/core';

export interface TabItem {
  id: any;
  label: string;
  value: string;
  disabled?: boolean;
  icon?: string | { start?: string; end?: string };
  content?: unknown;
  templateRef?: TemplateRef<any>;
}

export interface TabsConfig {
  variant?: 'basic' | 'boxed' | 'underline' | 'pills';
  orientation?: 'horizontal' | 'vertical';
  selectionMode?: 'follow' | 'explicit';
  preserveContent?: boolean;
  tabsInLoop?: boolean;
  softDisabled?: boolean;

  tabListClass?: string;
  tabClass?: string;
  activeTabClass?: string;
  disabledTabClass?: string;
  tabPanelClass?: string;
}


export interface TabItem {
  value: string;
  disabled?: boolean;
}

export interface TabsState {
  tabs: Signal<TabItem[]>;
  activeValue: Signal<string | null>;
  activeIndex: Signal<number>;

  registerTab(tab: TabItem): void;
  unregisterTab(value: string): void;
  select(value: string): void;
}
