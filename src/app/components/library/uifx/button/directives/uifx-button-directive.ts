import { computed, Directive, input } from '@angular/core';
import {
  UifxButtonSeverity,
  UifxButtonSize,
  UifxButtonType,
  UifxButtonVariant
} from '../helpers/uifx-button-models';

@Directive({
  selector: '[uifxButton]',
  exportAs: 'uifxButton',
  host: {
    '[class]': 'hostClasses()',
    '[attr.disabled]': 'disabled() || loading() ? true : null',
    '[attr.aria-busy]': 'loading()',
    '[attr.aria-disabled]': 'disabled() || loading()',
    '(click)': 'handleClick($event)'
  }
})
export class UifxButtonDirective {
  type = input<UifxButtonType>('button');
  size = input<UifxButtonSize>('medium');
  severity = input<UifxButtonSeverity>('primary');
  variant = input<UifxButtonVariant>('solid');
  disabled = input<boolean>(false);
  loading = input<boolean>(false);

  handleClick(event: MouseEvent) {
    if (this.disabled() || this.loading()) {
      event.preventDefault();
      event.stopImmediatePropagation();
    }
  }

  protected hostClasses = computed(() => ({
    'uifx-button': true,
    [`uifx-button-${this.severity()}`]: true,
    [`uifx-button-${this.variant()}`]: true,
    [`uifx-button-${this.size()}`]: true,
    'uifx-state-disabled': this.disabled() || this.loading()
  }));
}
