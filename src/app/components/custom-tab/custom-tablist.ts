import { ChangeDetectionStrategy, Component, computed, contentChildren } from '@angular/core';
import { CustomTabItem } from '@app/components/custom-tab/custom-tab-item';
import { TabItem } from './models/custom-tab-model';

@Component({
  selector: 'custom-tablist',
  template: `<ng-content></ng-content>`,
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: { class: 'custom-tablist-host' },
  styles: `
    :host {
      display: block;
    }
  `
})
export class CustomTablist {
  protected items = contentChildren(CustomTabItem);

  protected tabItems = computed<TabItem[]>(() => {
    const items = this.items();
    return items.map((item: CustomTabItem, index: number) => ({
      id: item.value(),
      label: item.value(),
      value: item.value(),
      disabled: item.disabled(),
      icon: item.icon(),
      selected: item.selected(),
      templateRef: item.templateRef()
    }));
  });

  getTabItems(): TabItem[] {
    return this.tabItems();
  }
}
