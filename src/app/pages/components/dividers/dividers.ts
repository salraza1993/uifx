import { Component } from '@angular/core';
import { ContentWrapper } from '@app/components/content-wrapper/content-wrapper';
import { Divider } from '@app/components/divider/divider';
import { GridContent } from '@app/components/grid-content/grid-content';
import { HeroTitle } from '@app/components/hero-title/hero-title';
import { IconDividerFull } from '@app/components/icons/icon-divider-full/icon-divider-full';

@Component({
  selector: 'dividers',
  imports: [ContentWrapper, HeroTitle, GridContent, Divider, IconDividerFull],
  templateUrl: './dividers.html',
  styleUrl: './dividers.css'
})
export class Dividers {}
