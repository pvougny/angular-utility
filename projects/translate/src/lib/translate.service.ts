import { Inject, Injectable } from '@angular/core';
import { Locale, PVO_TRANSLATE_LOCALES } from './definitions';

@Injectable({
  providedIn: 'root',
})
export class TranslateService {
  private readonly _dictionaries: Record<
    string,
    Map<string | number, string>
  > = {};

  constructor(@Inject(PVO_TRANSLATE_LOCALES) locales: Locale[]) {
    // due to expression syntax limitations in AoT, maps are created here
    locales.forEach((locale) => {
      Object.keys(locale).forEach((dictionary: string) => {
        if (dictionary in this._dictionaries) {
          console.warn(
            `[angular-utility/lib/translate] duplicate dictionary "${dictionary}".`
          );
        }
        this._dictionaries[dictionary] = new Map(locale[dictionary]);
      });
    });
  }

  /**
   * Translate a text with parameters
   *
   * @param dictionary map of keys
   * @param value text to look for
   * @param params parameters to be interpolated
   */
  public translate(
    dictionary: string,
    value: number | string,
    params?: Record<string, string>
  ): string {
    if (!(dictionary in this._dictionaries)) {
      console.warn(
        `[angular-utility/lib/translate] dictionary "${dictionary}" not found.`
      );
      return `{{${value}}}`;
    }

    if (!this._dictionaries[dictionary].has(value)) {
      console.warn(
        `[angular-utility/lib/translate] value "${value}" not found in dictionay "${dictionary}".`
      );
      return `{{${value}}}`;
    }

    return Object.keys(params || {}).reduce(
      (str: string, param: string) =>
        str.replace(`{{${param}}}`, params[param]),
      this._dictionaries[dictionary].get(value)
    );
  }
}
