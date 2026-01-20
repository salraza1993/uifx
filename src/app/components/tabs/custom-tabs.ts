import { Component, signal } from '@angular/core';
interface TabItem {
  label: string;
  id: string;
  selected: boolean;
}
@Component({
  selector: 'sr-tabs',
  imports: [],
  templateUrl: './custom-tabs.html',
  styleUrl: './custom-tabs.css',
  host: {
    class: 'custom-tabs-component',
  },
})
export class CustomTabs {
  tabs = signal<TabItem[]>([
    { label: 'Tab 1', id: 'Tab 1', selected: true },
    { label: 'Tab 2', id: 'Tab 2', selected: false },
    { label: 'Tab 3', id: 'Tab 3', selected: false },
    { label: 'Tab 4', id: 'Tab 4', selected: false },
    { label: 'Tab 5', id: 'Tab 5', selected: false },
  ]);

  selectTab(tabId: string): void {
    this.tabs.update((current: TabItem[]) => {
      return current.map((tab) => ({
        ...tab,
        selected: tab.id === tabId,
      }));
    });
  }
}
