import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'uifx-tab-panels',
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    class: 'uifx-tab-panels-host'
  },
  template: `<ng-content />`
})
export class UifxTabPanels {}
