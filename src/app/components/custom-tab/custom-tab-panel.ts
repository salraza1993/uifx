import { ChangeDetectionStrategy, Component, TemplateRef, input, viewChild } from '@angular/core';
import { TabItem } from './models/custom-tab-model';

@Component({
  selector: 'custom-tab-panel',
  template: `<ng-template #panel let-tab="tab"><ng-content></ng-content></ng-template>`,
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    class: 'custom-tab-panel-host'
  }
})
export class CustomTabPanel {
  value = input.required<string>();
  templateRef = viewChild.required<TemplateRef<{ tab: TabItem }>>('panel');
}
