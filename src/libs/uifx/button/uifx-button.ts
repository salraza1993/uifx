import { NgTemplateOutlet } from '@angular/common';
import {
  Component,
  computed,
  contentChild,
  inject,
  input,
  output,
  TemplateRef,
  ViewEncapsulation
} from '@angular/core';
import { BUTTON_GROUP_CONFIG } from '@uifx/buttonGroup';

import {
  uifxButtonBadgeDirective,
  uifxButtonIconEndDirective,
  uifxButtonIconStartDirective,
  uifxButtonLabelDirective
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
  selector: 'uifx-button, uifx-btn',
  standalone: true,
  imports: [NgTemplateOutlet, UifxButtonDirective],
  hostDirectives: [
    {
      directive: UifxButtonDirective,
      inputs: ['disabled', 'loading', 'iconOnly', 'badge']
    }
  ],
  templateUrl: './uifx-button.html',
  styleUrls: ['./uifx-button.css'],
  encapsulation: ViewEncapsulation.None,
  host: {
    class: 'uifx-button-host'
  }
})
export class UifxButton {
  private groupConfig = inject(BUTTON_GROUP_CONFIG, { optional: true });
  // Input properties
  label = input<UifxButtonLabel>(null);
  iconOnly = input(false);
  icon = input<UifxButtonIcon>(null);
  iconStart = input<UifxButtonIcon>(null);
  iconEnd = input<UifxButtonIcon>(null);
  type = input<UifxButtonType>('button');
  size = input<UifxButtonSize | undefined>();
  severity = input<UifxButtonSeverity | undefined>();
  variant = input<UifxButtonVariant | undefined>();
  rounded = input<boolean | undefined>();
  disabled = input(false);
  loading = input<boolean>(false);
  badge = input<number>(0);

  protected effectiveSize = computed(
    () => this.size() ?? (this.groupConfig ? this.groupConfig().size : undefined) ?? 'standard'
  );
  protected effectiveSeverity = computed(
    () => this.severity() ?? (this.groupConfig ? this.groupConfig().severity : undefined) ?? 'auto'
  );

  protected effectiveVariant = computed(
    () => this.variant() ?? (this.groupConfig ? this.groupConfig().variant : undefined) ?? 'solid'
  );

  protected effectiveRounded = computed(
    () => this.rounded() ?? (this.groupConfig ? this.groupConfig().rounded : undefined) ?? false
  );

  // Content queries for templates and directives
  tplStart = contentChild(uifxButtonIconStartDirective, { read: TemplateRef });
  tplEnd = contentChild(uifxButtonIconEndDirective, { read: TemplateRef });
  tplLabel = contentChild(uifxButtonLabelDirective, { read: TemplateRef });
  tplBadge = contentChild(uifxButtonBadgeDirective, { read: TemplateRef });

  protected hasDirectiveStart = contentChild(uifxButtonIconStartDirective);
  protected hasDirectiveEnd = contentChild(uifxButtonIconEndDirective);
  protected hasDirectiveLabel = contentChild(uifxButtonLabelDirective);
  protected hasDirectiveBadge = contentChild(uifxButtonBadgeDirective);

  _startIcon = contentChild<UifxTplRef>('uifxButtonStartIcon');
  _endIcon = contentChild<UifxTplRef>('uifxButtonEndIcon');
  _label = contentChild<UifxTplRef>('uifxButtonLabel');
  _badge = contentChild<UifxTplRef>('uifxButtonBadge');

  onClick = output<MouseEvent>();

  // Computed icon detection (exposed for hostDirectives binding)
  hasStartIcon = computed(
    () => !!this.iconStart() || !!this._startIcon() || !!this.hasDirectiveStart()
  );

  hasEndIcon = computed(() => !!this.iconEnd() || !!this._endIcon() || !!this.hasDirectiveEnd());
}
