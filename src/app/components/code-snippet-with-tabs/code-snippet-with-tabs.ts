import { CommonModule } from '@angular/common';
import { Component, computed, input, signal } from '@angular/core';
import { CodeSnippet } from '@app/components/code-snippet/code-snippet';
import { highlightText } from 'prism-code-editor/prism';
import 'prism-code-editor/prism/languages/css';
import 'prism-code-editor/prism/languages/markup'; // for HTML
import 'prism-code-editor/prism/languages/typescript';

type TabType = 'HTML' | 'TypeScript' | 'CSS';

@Component({
  selector: 'code-snippet-with-tabs',
  imports: [CommonModule, CodeSnippet],
  templateUrl: './code-snippet-with-tabs.html',
  styleUrl: './code-snippet-with-tabs.css'
})
export class CodeSnippetWithTabs {
  // Use inputs for the code content
  html = input<string>('');
  ts = input<string>('');
  css = input<string>('');

  tabsLabels = signal<TabType[]>(['HTML', 'TypeScript', 'CSS']);
  activeTab = signal<TabType>('HTML');

  // Compute which tabs should even be visible
  tabs = computed(() => {
    const available: ('html' | 'ts' | 'css')[] = [];
    if (this.html()) available.push('html');
    if (this.ts()) available.push('ts');
    if (this.css()) available.push('css');
    return available;
  });

  // Automatically re-highlight when the active tab or code changes
  highlightedCode = computed(() => {
    const tab = this.activeTab();
    const codeMap = { HTML: this.html(), TypeScript: this.ts(), CSS: this.css() };
    const langMap = { HTML: 'markup', TypeScript: 'typescript', CSS: 'css' };

    return highlightText(codeMap[tab], langMap[tab]);
  });
}
