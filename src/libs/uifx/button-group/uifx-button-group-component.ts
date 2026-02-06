import { Component, computed, input, Provider, ViewEncapsulation } from '@angular/core';
import { UifxButtonSeverity, UifxButtonSize, UifxButtonVariant } from '@uifx/button';
import { BUTTON_GROUP_CONFIG } from './button-group-context';

@Component({
  selector: 'uifx-button-group',
  template: `<ng-content></ng-content>`,
  encapsulation: ViewEncapsulation.None,
  host: {
    class: 'uifx-button-group',
    '[attr.data-orientation]': 'orientation()'
  },
  styleUrls: ['./button-group.css'],
  providers: [
    {
      provide: BUTTON_GROUP_CONFIG,
      useFactory: (button: UifxButtonGroup) =>
        computed(() => ({
          size: button.size(),
          severity: button.severity(),
          variant: button.variant(),
          rounded: button.rounded(),
          orientation: button.orientation()
        })),
      deps: [UifxButtonGroup]
    } as Provider
  ]
})
export class UifxButtonGroup {
  size = input<UifxButtonSize>('standard');
  severity = input<UifxButtonSeverity>('auto');
  variant = input<UifxButtonVariant>('solid');
  rounded = input<boolean>();
  orientation = input<'horizontal' | 'vertical'>('horizontal');
}
