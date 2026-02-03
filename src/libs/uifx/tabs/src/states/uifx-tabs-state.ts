import { computed, signal } from '@angular/core';
import { TabItem, TabsState } from './../models/uifx-tabs.models';

export function createTabsState(): TabsState {
  /** All registered tabs */
  const tabs = signal<TabItem[]>([]);

  /** Controlled / uncontrolled active value */
  const activeValue = signal<string | null>(null);

  /** Derived active index */
  const activeIndex = computed(() => tabs().findIndex(t => t.value === activeValue()));

  function registerTab(tab: TabItem) {
    tabs.update(list => [...list, tab]);

    // First tab becomes active by default (uncontrolled)
    if (activeValue() === null && !tab.disabled) {
      activeValue.set(tab.value);
    }
  }

  function unregisterTab(value: string) {
    tabs.update(list => list.filter(t => t.value !== value));
  }

  function select(value: string) {
    const tab = tabs().find(t => t.value === value && !t.disabled);
    if (!tab) return;

    activeValue.set(value);
  }

  return {
    tabs,
    activeValue,
    activeIndex,
    registerTab,
    unregisterTab,
    select
  };
}
