import { Injectable } from '@angular/core';
export type LOCAL_STORE_KEY = 'SR_UI_CONFIGS';

@Injectable({
  providedIn: 'root',
})
export class LocalStorageService {
  public readonly LOCAL_STORAGE_KEY: LOCAL_STORE_KEY = 'SR_UI_CONFIGS' as const;
  private _storage: Storage = localStorage;

  /**
   * Clear all items from `localStorage`
   * @example
   * localStorageService.clear();
   * console.log(localStorage.length); // Outputs 0
   */
  public clear(): void {
    this._storage.clear();
  }

  /**
   * Get item from `localStorage`
   * @param key as Key to retrieve item from `localStorage`
   * @returns Item value or null
   * @example
   * const value = localStorageService.getItem('myKey');
   * console.log(value); // Outputs the value associated with 'myKey' or null if not found
   */
  public getItem(key: string): string | null {
    return this._storage.getItem(key);
  }

  /**
   * Set item in `localStorage`
   * @param key as Key to set item in `localStorage`
   * @param value as Value to be set
   * @returns void
   * @example
   * const value = localStorageService.setItem('myKey', 'myValue');
   * console.log(value); // Outputs 'myValue'
   */
  public setItem(key: string, value: string): void {
    return this._storage.setItem(key, value);
  }

  /**
   * Remove item from `localStorage`
   * @param key as Key to remove item from `localStorage`
   * @returns void
   * @example
   * localStorageService.removeItem('myKey');
   * console.log(localStorage.getItem('myKey')); // Outputs null
   */
  public removeItem(key: string): void {
    return this._storage.removeItem(key);
  }

  /**
   * Get inner item from a JSON object stored in `localStorage`
   * @param storageKey as Key of the JSON object in `localStorage`
   * @param key as Item to be retrieved
   * @returns Item value or null
   * @example
   * const theme = localStorageService.getInnerItem('userSettings', 'theme');
   * console.log(theme); // Outputs the value of 'theme' from the 'userSettings' object or null if not found
   */
  // eslint-disable-next-line
  public getInnerItem(storageKey: string, key: string): any {
    let jsonValue = this._storage.getItem(storageKey);
    if (jsonValue !== null) {
      try {
        jsonValue = JSON.parse(jsonValue);
        if (
          jsonValue &&
          typeof jsonValue === 'object' &&
          Object.prototype.hasOwnProperty.call(jsonValue, key)
        ) {
          return jsonValue[key];
        }
      } catch (error) {
        console.warn('Failed to parse JSON from localStorage:', error);
      }
    }
    return null;
  }
  /**
   * Set inner item in a JSON object stored in `localStorage`
   * @param storageKey as Key of the JSON object in `localStorage`
   * @param key as Item to be set
   * @param value as Value to be set
   * @example
   * localStorageService.setInnerItem('userSettings', 'theme', 'dark');
   */
  public setInnerItem(storageKey: string, key: string, value: string): void {
    const storedValue = this._storage.getItem(storageKey);
    let jsonValue: string | Record<string, string>;
    if (storedValue !== null) {
      try {
        jsonValue = JSON.parse(storedValue);
        if (jsonValue && typeof jsonValue === 'object') {
          jsonValue[key] = value;
        } else {
          jsonValue = { [key]: value };
        }
      } catch (error) {
        console.warn('Failed to parse JSON from localStorage, creating new object:', error);
        jsonValue = { [key]: value };
      }
    } else {
      jsonValue = { [key]: value };
    }
    this.setItem(storageKey, JSON.stringify(jsonValue));
  }

  /**
   * Remove inner item from a JSON object stored in `localStorage`
   * @param storageKey as Key of the JSON object in `localStorage`
   * @param key as Item to be removed
   * @example
   * localStorageService.removeInnerItem('userSettings', 'theme');
   */
  public removeInnerItem(storageKey: string, key: string): void {
    let jsonValue = this._storage.getItem(storageKey);
    if (jsonValue !== null) {
      try {
        jsonValue = JSON.parse(jsonValue);

        if (
          jsonValue &&
          typeof jsonValue === 'object' &&
          Object.prototype.hasOwnProperty.call(jsonValue, key)
        ) {
          delete jsonValue[key];
          this.setItem(storageKey, JSON.stringify(jsonValue));
        }
      } catch (error) {
        console.warn('Failed to parse JSON from localStorage:', error);
      }
    }
  }
}
