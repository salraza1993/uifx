import { computed, Directive, input, signal } from '@angular/core';
import {
  UifxButtonSeverity,
  UifxButtonSize,
  UifxButtonType,
  UifxButtonVariant
} from '../modals/uifx-button-models';

@Directive({
  selector: '[uifxButton]',
  exportAs: 'uifxButton',
  host: {
    '[class]': 'hostClasses()',
    '[attr.disabled]': 'disabled() || loading() ? true : null',
    '[attr.aria-busy]': 'loading()',
    '[attr.aria-disabled]': 'disabled() || loading()',
    '(click)': 'handleClick($event)',
    '[attr.data-btn-severity]': 'severity()',
    '[attr.data-btn-variant]': 'variant()',
    '[attr.data-btn-type]': 'type()',
    '[attr.data-btn-size]': 'size()',
    '[attr.data-btn-icon-start]': '(hasStartIcon() || detectedStartIcon()) ? "true" : "false"',
    '[attr.data-btn-icon-end]': '(hasEndIcon() || detectedEndIcon()) ? "true" : "false"',
    '[attr.data-btn-icon-only]': 'iconOnly() ? "true" : "false"'
  }
})
export class UifxButtonDirective {
  type = input<UifxButtonType>('button');
  size = input<UifxButtonSize>('medium');
  severity = input<UifxButtonSeverity>('primary');
  variant = input<UifxButtonVariant>('solid');
  disabled = input<boolean>(false);
  loading = input<boolean>(false);

  // Icon detection inputs (manual - user can still override)
  hasStartIcon = input<boolean>(false);
  hasEndIcon = input<boolean>(false);
  iconOnly = input<boolean>(false);

  // Signals to track auto-detected icons (when directives register themselves)
  protected detectedStartIcon = signal<boolean>(false);
  protected detectedEndIcon = signal<boolean>(false);

  handleClick(event: MouseEvent) {
    if (this.disabled() || this.loading()) {
      event.preventDefault();
      event.stopImmediatePropagation();
    }
  }

  // Public method for helper directives to register themselves
  registerStartIcon() {
    this.detectedStartIcon.set(true);
  }

  registerEndIcon() {
    this.detectedEndIcon.set(true);
  }

  protected hostClasses = computed(() => ({
    'uifx-btn': true,
    [`uifx-btn-severity--${this.severity()}`]: true,
    [`uifx-btn-variant--${this.variant()}`]: true,
    [`uifx-btn-size--${this.size()}`]: true,
    [`uifx-btn-type--${this.type()}`]: true,
    'uifx-btn-state--disabled': this.disabled() || this.loading(),
    'uifx-btn-has-icon--start': this.hasStartIcon() || this.detectedStartIcon(),
    'uifx-btn-has-icon--end': this.hasEndIcon() || this.detectedEndIcon(),
    'uifx-btn-icon-only': this.iconOnly()
  }));
}
