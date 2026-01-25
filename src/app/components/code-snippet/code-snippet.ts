import { Component, input, OnChanges } from '@angular/core';
import { highlightText } from 'prism-code-editor/prism';

@Component({
  selector: 'code-snippet',
  imports: [],
  template: `
    <pre class="pce-nowrap" [style.height]="height()">
      <code [innerHTML]="highlightedCode"></code>
    </pre>
  `,
  styleUrl: './code-snippet.css',
  host: {
    class: 'code-snippet-host block'
  }
})
export class CodeSnippet implements OnChanges {
  code = input<string>('');
  language = input<string>('typescript');
  height = input<string>('auto');

  highlightedCode: string = '';

  ngOnChanges() {
    // Generate highlighted HTML statically for UI display
    this.highlightedCode = highlightText(this.code(), this.language());
  }
}
