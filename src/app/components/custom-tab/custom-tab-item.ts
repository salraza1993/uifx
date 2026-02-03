import { ChangeDetectionStrategy, Component, input, TemplateRef, viewChild } from '@angular/core';

@Component({
  selector: 'custom-tab-item',
  template: `<ng-template #itemTemplate><ng-content></ng-content></ng-template>`,
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    class: 'custom-tab-item-host'
  }
})
export class CustomTabItem {
  value = input<string>('');
  label = input<string>('');
  disabled = input<boolean>(false);
  icon = input<string>();
  selected = input<boolean>(false);

  templateRef = viewChild.required<TemplateRef<any>>('itemTemplate');
}
