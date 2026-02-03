import { NgTemplateOutlet } from '@angular/common';
import {
  booleanAttribute,
  Component,
  computed,
  contentChild,
  input,
  output,
  TemplateRef,
  ViewEncapsulation
} from '@angular/core';

import {
  UifxEndIconDirective,
  UifxLabelDirective,
  UifxStartIconDirective
} from './directives/helper-directives';
import { UifxButtonDirective } from './directives/uifx-button-directive';
import {
  UifxButtonIcon,
  UifxButtonLabel,
  UifxButtonSeverity,
  UifxButtonSize,
  UifxButtonType,
  UifxButtonVariant,
  UifxTplRef
} from './modals/uifx-button-models';

@Component({
  selector: 'uifx-button',
  standalone: true,
  // eslint-disable-next-line @angular-eslint/no-unused-components
  imports: [NgTemplateOutlet, UifxButtonDirective],
  hostDirectives: [
    {
      directive: UifxButtonDirective,
      inputs: ['severity', 'variant', 'size', 'disabled', 'loading']
    }
  ],
  templateUrl: './uifx-button.html',
  styleUrl: './uifx-button.css',
  encapsulation: ViewEncapsulation.None,
  host: {
    class: 'uifx-button-host'
  }
})
export class UifxButton {
  // Input properties
  label = input<UifxButtonLabel>(null);
  iconOnly = input(false, { transform: booleanAttribute });
  icon = input<UifxButtonIcon>(null);
  iconStart = input<UifxButtonIcon>(null);
  iconEnd = input<UifxButtonIcon>(null);
  type = input<UifxButtonType>('button');
  size = input<UifxButtonSize>('medium');
  severity = input<UifxButtonSeverity>('primary');
  variant = input<UifxButtonVariant>('solid');
  disabled = input(false);
  loading = input<boolean>(false);

  // Content queries for templates and directives
  tplStart = contentChild(UifxStartIconDirective, { read: TemplateRef });
  tplEnd = contentChild(UifxEndIconDirective, { read: TemplateRef });
  tplLabel = contentChild(UifxLabelDirective, { read: TemplateRef });

  protected hasDirectiveStart = contentChild(UifxStartIconDirective);
  protected hasDirectiveEnd = contentChild(UifxEndIconDirective);
  protected hasDirectiveLabel = contentChild(UifxLabelDirective);

  _startIcon = contentChild<UifxTplRef>('startIcon');
  _endIcon = contentChild<UifxTplRef>('endIcon');

  onClick = output<MouseEvent>();

  // Computed icon detection (exposed for hostDirectives binding)
  hasStartIcon = computed(
    () => !!this.iconStart() || !!this._startIcon() || !!this.hasDirectiveStart()
  );

  hasEndIcon = computed(() => !!this.iconEnd() || !!this._endIcon() || !!this.hasDirectiveEnd());
}
