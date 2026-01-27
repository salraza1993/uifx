import { Component, computed, input } from '@angular/core';

interface DividerHostConfigs {
  vMargin?: string;
  vPadding?: string;
  contentVPadding?: string;
  hMargin?: string;
  hPadding?: string;
  contentHPadding?: string;
  align?: 'start' | 'center' | 'end';
  orientation?: 'horizontal' | 'vertical';
  borderType?: 'solid' | 'dashed' | 'dotted';
}
interface DividerSettings {
  v_margin: string | null;
  v_padding: string | null;
  content_v_padding: string | null;
  h_margin: string | null;
  h_padding: string | null;
  content_h_padding: string | null;
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
    '[style.--divider-vertical-margin]': 'setConfigs().v_margin',
    '[style.--divider-vertical-padding]': 'setConfigs().v_padding',
    '[style.--divider-vertical-content-padding]': 'setConfigs().content_v_padding',
    '[style.--divider-horizontal-margin]': 'setConfigs().h_margin',
    '[style.--divider-horizontal-padding]': 'setConfigs().h_padding',
    '[style.--divider-horizontal-content-padding]': 'setConfigs().content_h_padding'
  }
})
export class Divider {
  orientation = input<'horizontal' | 'vertical'>('horizontal');
  borderType = input<'solid' | 'dashed' | 'dotted'>('solid');
  align = input<'start' | 'center' | 'end'>('start');

  hMargin = input<string | null>(null);
  hPadding = input<string | null>(null);
  contentHPadding = input<string | null>(null);
  vMargin = input<string | null>(null);
  vPadding = input<string | null>(null);
  contentVPadding = input<string | null>(null);

  dividerConfig = input<DividerHostConfigs | null>(null);

  protected setConfigs = computed((): DividerSettings => {
    const configs = this.dividerConfig();
    const settings: DividerSettings = {
      h_margin: this.hMargin() || (configs?.hMargin ?? null),
      h_padding: this.hPadding() || (configs?.hPadding ?? null),
      content_h_padding: this.contentHPadding() || (configs?.contentHPadding ?? null),
      v_margin: this.vMargin() || (configs?.vMargin ?? null),
      v_padding: this.vPadding() || (configs?.vPadding ?? null),
      content_v_padding: this.contentVPadding() || (configs?.contentVPadding ?? null)
    };
    return { ...settings };
  });

  protected hostClasses = computed(() => {
    let classes = ['divider-host'];

    this.orientation() === 'horizontal'
      ? classes.push('divider--horizontal')
      : classes.push('divider--vertical');

    this.borderType() === 'dashed'
      ? classes.push('divider-type--dashed')
      : this.borderType() === 'dashed'
        ? classes.push('divider-type--dashed')
        : classes.push('divider-type--solid');
    return classes.join(' ');
  });

  protected hostStyles = computed<Record<string, string>>(() => {
    return {
      '--divider-border-type': this.borderType(),
      '--divider-border-width': 'var(--sr-border-width, 1px)',
      '--divider-border-color': 'var(--sr-border-color, currentColor)',
      '--divider-vertical-margin': '0 1rem',
      '--divider-vertical-padding': '0.5rem 0',
      '--divider-vertical-content-padding': '0.5rem 0',
      '--divider-horizontal-margin': '1rem 0',
      '--divider-horizontal-padding': '0 1rem',
      '--divider-horizontal-content-padding': '0 0.5rem',
      '--divider-content-background': 'var(--content-background)',
      '--divider-content-color': 'var(--text-color)'
    };
  });
}
// <p-divider role="separator" aria-orientation="horizontal" data-p="horizontal solid" class="p-component p-divider p-divider-horizontal p-divider-left p-divider-solid" pc16="" data-pc-section="root" data-pc-name="t" style="justify-content: center;"><div class="p-divider-content" data-pc-section="content"></div></p-divider>
