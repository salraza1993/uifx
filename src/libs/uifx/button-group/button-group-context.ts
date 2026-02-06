import { InjectionToken, Signal } from '@angular/core';
import {
  UifxButtonSeverity,
  UifxButtonSize,
  UifxButtonVariant
} from '../button/modals/uifx-button-models';

export interface ButtonGroupConfig {
  size?: UifxButtonSize;
  severity?: UifxButtonSeverity;
  variant?: UifxButtonVariant;
  rounded?: boolean;
  orientation?: 'horizontal' | 'vertical';
}

export const BUTTON_GROUP_CONFIG = new InjectionToken<Signal<ButtonGroupConfig>>(
  'button-group-config'
);
