import { Component, computed, input } from '@angular/core';

@Component({
  selector: 'layout-grid-wrapper',
  imports: [],
  templateUrl: './layout-grid-wrapper.html',
  styleUrl: './layout-grid-wrapper.css',
  host: {
    class: 'layout-grid-wrapper-host',
    '[style.--grid-cols]': 'columns()',
    '[style.--grid-rows]': 'rows()'
  }
})
export class LayoutGridWrapper {
  columns = input<number>(10);
  rows = input<number>(5);
  contentColSpan = input<number>(8);
  contentRowSpan = input<number>(3);

  protected gridItems = computed(() => {
    const cols = this.columns();
    const rows = this.rows();
    const contentStartCol = Math.floor((cols - this.contentColSpan()) / 2) + 1;
    const contentStartRow = Math.floor((rows - this.contentRowSpan()) / 2) + 1;
    const contentEndCol = contentStartCol + this.contentColSpan();
    const contentEndRow = contentStartRow + this.contentRowSpan();

    const items = [];
    for (let r = 1; r <= rows; r++) {
      for (let c = 1; c <= cols; c++) {
        // Skip cells that are part of the content box
        if (
          r >= contentStartRow &&
          r < contentEndRow &&
          c >= contentStartCol &&
          c < contentEndCol
        ) {
          continue;
        }
        items.push({ col: c, row: r });
      }
    }
    return items;
  });

  protected contentBox = computed(() => ({
    colStart: Math.floor((this.columns() - this.contentColSpan()) / 2) + 1,
    rowStart: Math.floor((this.rows() - this.contentRowSpan()) / 2) + 1,
    colSpan: this.contentColSpan(),
    rowSpan: this.contentRowSpan()
  }));
}
