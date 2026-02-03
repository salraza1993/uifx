import { NgTemplateOutlet } from '@angular/common';
import {
  booleanAttribute,
  Component,
  computed,
  contentChild,
  input,
  output,
  TemplateRef
} from '@angular/core';

// IMPORT DIRECTLY FROM SOURCE FILES TO AVOID NG8002 CIRCULAR DEPS
import {
  UifxEndIconDirective,
  UifxLabelDirective,
  UifxStartIconDirective
} from './directives/helper-directives';
import { UifxButtonDirective } from './directives/uifx-button-directive';
import { hostClassBindingHelper } from './helpers/host-class-binding';
import {
  UifxButtonIcon,
  UifxButtonLabel,
  UifxButtonSeverity,
  UifxButtonSize,
  UifxButtonType,
  UifxButtonVariant,
  UifxTplRef
} from './helpers/uifx-button-models';

@Component({
  selector: 'uifx-button',
  standalone: true,
  imports: [
    NgTemplateOutlet,
    UifxButtonDirective, // Registers [uifxButton]
    UifxStartIconDirective, // Registers [uifxStartIcon]
    UifxEndIconDirective,
    UifxLabelDirective
  ],
  // hostDirectives ensures the <uifx-button> tag itself gets the styles
  hostDirectives: [
    {
      directive: UifxButtonDirective,
      inputs: ['severity', 'variant', 'size', 'disabled', 'loading']
    }
  ],
  templateUrl: './uifx-button.html',
  styleUrl: './uifx-button.css',
  host: {
    '[class]': 'hostClassBinding()',
    class: 'uifx-btn-host'
  }
})
export class UifxButton {
  label = input<UifxButtonLabel>(null);
  iconOnly = input(false, { transform: booleanAttribute });
  iconStart = input<UifxButtonIcon>(null);
  iconEnd = input<UifxButtonIcon>(null);
  type = input<UifxButtonType>('button');
  size = input<UifxButtonSize>('medium');
  severity = input<UifxButtonSeverity>('primary');
  variant = input<UifxButtonVariant>('solid');
  disabled = input(false);
  loading = input<boolean>(false);

  // Queries for TemplateRef usage (e.g., <ng-template uifxStartIcon>)
  tplStart = contentChild(UifxStartIconDirective, { read: TemplateRef });
  tplEnd = contentChild(UifxEndIconDirective, { read: TemplateRef });
  tplLabel = contentChild(UifxLabelDirective, { read: TemplateRef });

  // Fallback queries for pure component icon props
  _startIcon = contentChild<UifxTplRef>('startIcon');
  _endIcon = contentChild<UifxTplRef>('endIcon');

  onClick = output<MouseEvent>();

  protected hostClassBinding = computed(() => {
    return hostClassBindingHelper({
      label: this.label,
      iconOnly: this.iconOnly,
      severity: this.severity,
      variant: this.variant,
      size: this.size,
      disabled: this.disabled,
      iconStart: this.iconStart,
      type: this.type,
      _startIcon: this._startIcon,
      iconEnd: this.iconEnd,
      _endIcon: this._endIcon
    });
  });
}
