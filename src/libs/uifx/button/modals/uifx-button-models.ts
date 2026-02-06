import { TemplateRef } from '@angular/core';
export type UifxButtonLabel = string | null;
export type UifxButtonIcon = string | null;
export type UifxButtonSeverity =
  | 'primary'
  | 'secondary'
  | 'danger'
  | 'success'
  | 'warning'
  | 'info'
  | 'light'
  | 'gray'
  | 'dark'
  | 'link'
  | 'auto';
export type UifxButtonVariant = 'solid' | 'outlined' | 'text';
export type UifxButtonSize = 'ex-small' | 'small' | 'standard' | 'large' | 'ex-large';
export type UifxButtonType = 'button' | 'submit' | 'link' | 'reset';
export type UifxTplRef = TemplateRef<any>;
