import { Component, input } from '@angular/core';

type PaddingSize =
  | 'xs'
  | 'sm'
  | 'md'
  | 'lg'
  | 'xl'
  | '2xl'
  | '3xl'
  | '4xl'
  | '5xl'
  | '6xl'
  | '7xl'
  | '8xl'
  | '9xl'
  | '10xl'
  | 'none';
@Component({
  selector: 'grid-content',
  imports: [],
  templateUrl: './grid-content.html',
  styleUrl: './grid-content.css',
  host: {
    class: 'grid-content-host relative block',
    '[style.--content-padding]': '`var(--sr-padding--${padding()})`'
  }
})
export class GridContent {
  padding = input<PaddingSize>('md');
}
