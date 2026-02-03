import {
  booleanAttribute,
  Component,
  computed,
  ElementRef,
  input,
  signal,
  viewChild
} from '@angular/core';

type Orientation = 'horizontal' | 'vertical';
type Alignment = 'start' | 'center' | 'end' | 'left' | 'right' | 'top' | 'bottom';
type BorderType = 'solid' | 'dashed' | 'dotted';
type MarginPaddingAxis = { x?: number; y?: number };
interface DividerHostConfigs {
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
interface DividerSettings {
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
@Component({
  selector: 'divider',
  imports: [],
  templateUrl: './divider.html',
  styleUrl: './divider.css',
  host: {
    '[attr.aria-orientation]': 'orientation()',
    '[attr.role]': `'separator'`,
    '[attr.data-border-type]': 'borderType()',
    '[class]': 'hostClasses()',
    '[style.--divider-border-width.px]': '(borderWidth() || setConfigs()?.borderWidth) ?? null',
    '[style.--divider-border-type]': '(borderType() || setConfigs()?.borderType) ?? null',
    '[style.--divider-border-color]': '(borderColor() || setConfigs()?.borderColor) ?? null',

    '[style.--divider-v-mar--x.rem]': '(vMargin()?.x || setConfigs()?.v_margin_x) ?? null',
    '[style.--divider-v-mar--y.rem]': '(vMargin()?.y || setConfigs()?.v_margin_y) ?? null',
    '[style.--divider-v-pad--x.rem]': '(vPadding()?.x || setConfigs()?.v_padding_x) ?? null',
    '[style.--divider-v-pad--y.rem]': '(vPadding()?.y || setConfigs()?.v_padding_y) ?? null',
    '[style.--divider-v-content-pad--x.rem]':
      '(contentVPadding()?.x || setConfigs()?.content_v_padding_x) ?? null',
    '[style.--divider-v-content-pad--y.rem]':
      '(contentVPadding()?.y || setConfigs()?.content_v_padding_y) ?? null',

    '[style.--divider-h-mar--x.rem]': '(hMargin()?.x || setConfigs()?.h_margin_x) ?? null',
    '[style.--divider-h-mar--y.rem]': '(hMargin()?.y || setConfigs()?.h_margin_y) ?? null',
    '[style.--divider-h-pad--x.rem]': '(hPadding()?.x || setConfigs()?.h_padding_x) ?? null',
    '[style.--divider-h-pad--y.rem]': '(hPadding()?.y || setConfigs()?.h_padding_y) ?? null',
    '[style.--divider-h-content-pad--x.rem]':
      '(contentHPadding()?.x || setConfigs()?.content_h_padding_x) ?? null',
    '[style.--divider-h-content-pad--y.rem]':
      '(contentHPadding()?.y || setConfigs()?.content_h_padding_y) ?? null'
  }
})
export class Divider {
  slot = viewChild<ElementRef<HTMLSlotElement>>('slot');
  hasContent = signal<boolean>(false);

  orientation = input<Orientation>('horizontal');
  borderType = input<BorderType | null>(null);
  borderWidth = input<number | null>(null);
  borderColor = input<string | null>(null);
  contentAlign = input<Alignment>('start');
  noLine = input(false, { transform: booleanAttribute });
  hMargin = input<MarginPaddingAxis | null>(null);
  hPadding = input<MarginPaddingAxis | null>(null);
  contentHPadding = input<MarginPaddingAxis | null>(null);
  vMargin = input<MarginPaddingAxis | null>(null);
  vPadding = input<MarginPaddingAxis | null>(null);
  contentVPadding = input<MarginPaddingAxis | null>(null);
  dividerConfig = input<DividerHostConfigs | null>(null);

  /* For Components based */
  protected setConfigs = computed((): DividerSettings => {
    const configs = this.dividerConfig();
    const settings: DividerSettings = {
      h_margin_x: this.hMargin()?.x || (configs?.hMargin?.x ?? null),
      h_margin_y: this.hMargin()?.y || (configs?.hMargin?.y ?? null),
      h_padding_x: this.hPadding()?.x || (configs?.hPadding?.x ?? null),
      h_padding_y: this.hPadding()?.y || (configs?.hPadding?.y ?? null),
      v_margin_x: this.vMargin()?.x || (configs?.vMargin?.x ?? null),
      v_margin_y: this.vMargin()?.y || (configs?.vMargin?.y ?? null),
      v_padding_x: this.vPadding()?.x || (configs?.vPadding?.x ?? null),
      v_padding_y: this.vPadding()?.y || (configs?.vPadding?.y ?? null),
      content_h_padding_x: this.contentHPadding()?.x || (configs?.contentHPadding?.x ?? null),
      content_v_padding_x: this.contentVPadding()?.y || (configs?.contentVPadding?.y ?? null),
      content_h_padding_y: this.contentHPadding()?.y || (configs?.contentHPadding?.y ?? null),
      content_v_padding_y: this.contentVPadding()?.x || (configs?.contentVPadding?.x ?? null)
    };
    return { ...settings };
  });

  protected showLine = computed(() => this.noLine() || this.setConfigs()?.noLine);

  protected hostClasses = computed(() => {
    let classes = ['divider-host'];
    this.showLine() && classes.push('divider--no-line');
    this.orientation() === 'horizontal'
      ? classes.push('divider--horizontal')
      : classes.push('divider--vertical');

    this.contentAlign() === 'start'
      ? classes.push('divider-content-align--start')
      : this.contentAlign() === 'center'
        ? classes.push('divider-content-align--center')
        : classes.push('divider-content-align--end');

    this.borderType() === 'dashed'
      ? classes.push('divider-type--dashed')
      : this.borderType() === 'dashed'
        ? classes.push('divider-type--dashed')
        : classes.push('divider-type--solid');
    return classes.join(' ');
  });

  protected hostStyles = computed(() => {
    return {
      '--divider-border-width.px': (this.borderWidth() || this.setConfigs()?.borderWidth) ?? null,
      '--divider-border-type': (this.borderType() || this.setConfigs()?.borderType) ?? null,
      '--divider-border-color': (this.borderColor() || this.setConfigs()?.borderColor) ?? null,

      '--divider-v-mar--x': `${(this.vMargin()?.x || this.setConfigs()?.v_margin_x) ?? null}rem`,
      '--divider-v-mar--y': `${(this.vMargin()?.y || this.setConfigs()?.v_margin_y) ?? null}rem`,
      '--divider-v-pad--x': `${(this.vPadding()?.x || this.setConfigs()?.v_padding_x) ?? null}rem`,
      '--divider-v-pad--y': `${(this.vPadding()?.y || this.setConfigs()?.v_padding_y) ?? null}rem`,
      '--divider-v-content-pad--x': `${(this.contentVPadding()?.x || this.setConfigs()?.content_v_padding_x) ?? null}rem`,
      '--divider-v-content-pad--y': `${(this.contentVPadding()?.y || this.setConfigs()?.content_v_padding_y) ?? null}rem`,

      '--divider-h-mar--x': `${(this.hMargin()?.x || this.setConfigs()?.h_margin_x) ?? null}rem`,
      '--divider-h-mar--y': `${(this.hMargin()?.y || this.setConfigs()?.h_margin_y) ?? null}rem`,
      '--divider-h-pad--x': `${(this.hPadding()?.x || this.setConfigs()?.h_padding_x) ?? null}rem`,
      '--divider-h-pad--y': `${(this.hPadding()?.y || this.setConfigs()?.h_padding_y) ?? null}rem`,
      '--divider-h-content-pad--x': `${(this.contentHPadding()?.x || this.setConfigs()?.content_h_padding_x) ?? null}rem`,
      '--divider-h-content-pad--y': `${(this.contentHPadding()?.y || this.setConfigs()?.content_h_padding_y) ?? null}rem`,
      '--divider-content-bg': 'transparent',
      '--divider-content-color': 'inherit'
    };
  });
}
// <p-divider role="separator" aria-orientation="horizontal" data-p="horizontal solid" class="p-component p-divider p-divider-horizontal p-divider-left p-divider-solid" pc16="" data-pc-section="root" data-pc-name="t" style="justify-content: center;"><div class="p-divider-content" data-pc-section="content"></div></p-divider>
