import { Component } from '@angular/core';
import { ContentWrapper } from '../content-wrapper/content-wrapper';
import { Logo } from "../logo/logo";
import { ThemeChanger } from "../theme-changer/theme-changer";
import { HeaderMenu } from "./header-menu/header-menu";

@Component({
  selector: 'sr-header',
  imports: [ContentWrapper, ThemeChanger, Logo, HeaderMenu],
  templateUrl: './header.html',
  styleUrl: './header.css',
  host: { class: 'sr-header border' },
})
export class Header {}
