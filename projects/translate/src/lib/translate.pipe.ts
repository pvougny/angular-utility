import { Pipe, PipeTransform } from '@angular/core';
import { TranslateService } from './translate.service';

@Pipe({ name: 'pvoTranslate' })
export class PvoTranslatePipe implements PipeTransform {
  constructor(private readonly _translateService: TranslateService) {}

  public transform(
    value: string,
    dictionary: string,
    params: Record<string, string>
  ): string {
    return this._translateService.translate(dictionary, value, params);
  }
}
