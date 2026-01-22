import { Component, computed, DOCUMENT, effect, inject, signal } from '@angular/core';
import {
  AppConfigService,
  AppearanceType,
} from '../../stores/browser-store/app-config-service/app-config-service';

@Component({
  selector: 'sr-theme-changer',
  imports: [],
  templateUrl: './theme-changer.html',
  styleUrl: './theme-changer.css',
  host: { class: 'sr-theme-changer flex--center cursor--pointer' }
})
export class ThemeChanger {
  private _appConfig = inject(AppConfigService);
  private _rootElement = inject(DOCUMENT).documentElement as HTMLElement;
  private readonly _media = window.matchMedia('(prefers-color-scheme: dark)');
  readonly mode = computed<AppearanceType>(() => this._appConfig.getAppearance());

  readonly systemDark = signal(this._media.matches);
  readonly isDark = computed(() => {
    return this.mode() === 'auto' ? this.systemDark() : !this.systemDark();
  });

  readonly resolvedDark = computed(() => {
    if (this.mode() === 'auto') {
      return this.systemDark();
    }
    return this.mode() === 'dark';
  });

  readonly iconType = computed<'desktop' | 'sun' | 'moon'>(() => {
    switch (this.mode()) {
      case 'auto':
        return 'desktop';
      case 'dark':
        return 'moon';
      case 'light':
        return 'sun';
    }
  });

  private _updateDOM(): void {
    const root = this._rootElement;
    root.setAttribute('data-theme', this.mode());
  }

  public toggleIcon(): void {
    let next: AppearanceType;
    if (this.mode() === 'auto') {
      next = this.systemDark() ? 'light' : 'dark';
    } else {
      next = 'auto';
    }
    this._appConfig.setAppearance(next);
  }

  private _modeEffect = effect(() => {
    this.mode();
    this._updateDOM();
  });

  ngOnInit(): void {
    this._updateDOM();
  }
}
