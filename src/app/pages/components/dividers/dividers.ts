import { Component } from '@angular/core';
import { ContentWrapper } from '@app/components/content-wrapper/content-wrapper';
import { GridContent } from '@app/components/grid-content/grid-content';
import { HeroTitle } from '@app/components/hero-title/hero-title';
import { IconDividerFull } from '@app/components/icons/icon-divider-full/icon-divider-full';
import { Divider } from '@app/components/library/divider/divider';

@Component({
  selector: 'dividers',
  imports: [ContentWrapper, HeroTitle, GridContent, Divider, IconDividerFull],
  templateUrl: './dividers.html',
  styleUrl: './dividers.css'
})
export class Dividers {}
