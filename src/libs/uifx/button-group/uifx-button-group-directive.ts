import { computed, Directive, input, Provider } from '@angular/core';
import { UifxButtonSeverity, UifxButtonSize, UifxButtonVariant } from '@uifx/button';
import { BUTTON_GROUP_CONFIG } from './button-group-context';

@Directive({
  selector: '[uifxButtonGroup]',
  standalone: true,
  host: {
    class: 'uifx-button-group',
    '[attr.data-orientation]': 'orientation()'
  },
  providers: [
    {
      provide: BUTTON_GROUP_CONFIG,
      useFactory: (directive: UifxButtonGroupDirective) =>
        computed(() => ({
          size: directive.size(),
          severity: directive.severity(),
          variant: directive.variant(),
          rounded: directive.rounded(),
          orientation: directive.orientation()
        })),
      deps: [UifxButtonGroupDirective]
    } as Provider
  ]
})
export class UifxButtonGroupDirective {
  size = input<UifxButtonSize>('standard');
  severity = input<UifxButtonSeverity>('auto');
  variant = input<UifxButtonVariant>('solid');
  rounded = input<boolean>();
  orientation = input<'horizontal' | 'vertical'>('horizontal');

  // constructor(private directive: UifxButtonGroupDirective) {}
}
