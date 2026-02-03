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
} from './helpers/uifx-button-models';

@Component({
  selector: 'uifx-button',
  standalone: true,
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
    '[class]': 'hostClasses()',
    class: 'uifx-button-host'
  }
})
export class UifxButton {
  // Input properties
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

  // Computed icon detection
  protected hasStartIcon = computed(
    () => !!this.iconStart() || !!this._startIcon() || !!this.hasDirectiveStart()
  );

  protected hasEndIcon = computed(
    () => !!this.iconEnd() || !!this._endIcon() || !!this.hasDirectiveEnd()
  );

  // Host classes
  protected hostClasses = computed(() => ({
    'uifx-button-icon--start': this.hasStartIcon(),
    'uifx-button-icon--end': this.hasEndIcon(),
    'uifx-button-icon-only': this.iconOnly()
  }));
}
