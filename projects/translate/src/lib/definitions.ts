import { InjectionToken } from '@angular/core';

export type Locale = Record<string, [string | number, string][]>;

export const PVO_TRANSLATE_LOCALES: InjectionToken<
  Locale[]
> = new InjectionToken('pvo-translate-locales');
