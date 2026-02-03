import { TemplateRef } from '@angular/core';
export type UifxButtonLabel = string | null;
export type UifxButtonIcon = string | null;
export type UifxButtonSeverity = 'primary' | 'secondary' | 'danger' | 'success' | 'warning' | 'info' | 'light' | 'dark' | 'link';
export type UifxButtonVariant = 'solid' | 'outlined' | 'text';
export type UifxButtonSize = 'small' | 'medium' | 'large';
export type UifxButtonType = 'button' | 'submit' | 'link' | 'reset';
export type UifxTplRef = TemplateRef<any> | null | undefined;
