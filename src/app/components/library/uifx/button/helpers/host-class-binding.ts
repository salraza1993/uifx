import { Signal } from '@angular/core';
import {
  UifxButtonIcon,
  UifxButtonLabel,
  UifxButtonSeverity,
  UifxButtonSize,
  UifxButtonVariant,
  UifxTplRef
} from './uifx-button-models';

interface HostClassBindingInterface {
  [key: string]: boolean;
}
interface ParametersTypes {
  label: Signal<UifxButtonLabel>;
  iconOnly: Signal<boolean>;
  severity: Signal<UifxButtonSeverity>;
  variant: Signal<UifxButtonVariant>;
  size: Signal<UifxButtonSize>;
  disabled: Signal<boolean>;
  iconStart: Signal<UifxButtonIcon>;
  iconEnd: Signal<UifxButtonIcon>;
  type: Signal<string>;
  _startIcon: Signal<UifxTplRef>;
  _endIcon: Signal<UifxTplRef>;
}

export const hostClassBindingHelper = ({
  label,
  iconOnly,
  severity,
  variant,
  size,
  disabled,
  iconStart,
  _startIcon,
  iconEnd,
  _endIcon,
  type
}: ParametersTypes): HostClassBindingInterface => {
  return {
    'uifx-btn-host': true,
    'uifx-btn--with-label': !!label(),
    'uifx-btn--with-icon-only': iconOnly(),
    [`uifx-button-${severity()}`]: true,
    [`uifx-button-${variant()}`]: true,
    'uifx-btn--has-icon': !!iconStart() || !!_startIcon() || !!iconEnd() || !!_endIcon(),
    'uifx-btn--has-icon-start': !!iconStart() || !!_startIcon(),
    'uifx-btn--has-icon-end': !!iconEnd() || !!_endIcon(),
    'uifx-btn--disabled': disabled(),
    [`uifx-btn--type-${type()}`]: true,
    [`uifx-btn--size-${size()}`]: true
  };
};
