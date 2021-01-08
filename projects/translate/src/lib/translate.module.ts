import { ModuleWithProviders, NgModule } from '@angular/core';
import { Locale, PVO_TRANSLATE_LOCALES } from './definitions';
import { PvoTranslatePipe } from './translate.pipe';
import { TranslateService } from './translate.service';

@NgModule({
  declarations: [PvoTranslatePipe],
  exports: [PvoTranslatePipe],
})
export class TranslateModule {
  constructor() {}

  public static forRoot(
    locales: Locale[]
  ): ModuleWithProviders<TranslateModule> {
    return {
      ngModule: TranslateModule,
      providers: [
        TranslateService,
        { provide: PVO_TRANSLATE_LOCALES, useValue: locales },
      ],
    };
  }
}
