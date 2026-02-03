import { ChangeDetectionStrategy, Component, computed, contentChildren } from '@angular/core';
import { CustomTabPanel } from './custom-tab-panel';

@Component({
  selector: 'custom-tab-panels',
  template: `<ng-content></ng-content>`,
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    class: 'custom-tab-panels-host'
  }
})
export class CustomTabPanels {
  protected panels = contentChildren(CustomTabPanel);

  protected panelMap = computed(() => {
    const panels = this.panels();
    const map = new Map<string, CustomTabPanel>();
    for (const panel of panels) {
      map.set(panel.value(), panel);
    }
    return map;
  });

  panelFor(value: string): CustomTabPanel | undefined {
    return this.panelMap().get(value);
  }
}
