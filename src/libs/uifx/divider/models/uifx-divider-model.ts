export type Orientation = 'horizontal' | 'vertical';

export type Alignment = 'start' | 'center' | 'end' | 'left' | 'right' | 'top' | 'bottom';

export type BorderType = 'solid' | 'dashed' | 'dotted';

export type MarginPaddingAxis = { x?: number; y?: number };

export interface DividerHostConfigs {
  vMargin?: MarginPaddingAxis;
  vPadding?: MarginPaddingAxis;
  contentVPadding?: MarginPaddingAxis;
  hMargin?: MarginPaddingAxis;
  hPadding?: MarginPaddingAxis;
  contentHPadding?: MarginPaddingAxis;
  align?: Alignment;
  orientation?: Orientation;
  borderType?: BorderType;
  noLine?: boolean;
  borderWidth?: number;
  borderColor?: string;
}

export interface DividerSettings {
  v_margin_y: number | null;
  v_margin_x: number | null;
  v_padding_y: number | null;
  v_padding_x: number | null;
  h_margin_y: number | null;
  h_margin_x: number | null;
  h_padding_y: number | null;
  h_padding_x: number | null;
  content_v_padding_y: number | null;
  content_v_padding_x: number | null;
  content_h_padding_y: number | null;
  content_h_padding_x: number | null;
  borderWidth?: number | null;
  borderType?: BorderType | null;
  borderColor?: string | null;
  noLine?: boolean | null;
}
