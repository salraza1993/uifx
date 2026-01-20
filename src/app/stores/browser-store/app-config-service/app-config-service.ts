import { computed, inject, Injectable, signal } from '@angular/core';
import { LocalStorageService } from '@services/local-storage-service/local-storage-service';
export type AppearanceType = 'auto' | 'dark' | 'light';

export interface AppDefaultConfig {
  appearance: AppearanceType;
}

@Injectable({
  providedIn: 'root',
})
export class AppConfigService {
  private _storage = inject(LocalStorageService);
  private _storageKey = this._storage.LOCAL_STORAGE_KEY;
  public defaultConfigs: AppDefaultConfig = {
    appearance: 'auto',
  };
  private _appLocalConfig = signal<AppDefaultConfig>(this.defaultConfigs);
  public readonly getAppConfig = computed(() => this._appLocalConfig());
  public readonly getAppearance = computed<AppearanceType>(() => this._appLocalConfig().appearance);

  public initializeAppConfig(): void {
    const config = this._storage.getItem(this._storageKey);
    if (!config) {
      this._storage.setItem(this._storageKey, JSON.stringify(this.defaultConfigs));
    }
    this._appLocalConfig.set(config ? JSON.parse(config) : this.defaultConfigs);
  }

  public setAppearance(mode: AppearanceType): void {
    const currentConfig = this._appLocalConfig();
    const updatedConfig = JSON.parse(JSON.stringify(currentConfig));
    updatedConfig.appearance = mode;
    this._appLocalConfig.set(updatedConfig);
    this._storage.setItem(this._storageKey, JSON.stringify(updatedConfig));
  }
}
