import { TestBed } from '@angular/core/testing';
import { Locale } from './definitions';
import { TranslateModule } from './translate.module';

import { TranslateService } from './translate.service';

const locale: Locale = {
  lorem: [
    ['a', 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.'],
    ['b', 'Etiam malesuada posuere libero, nec ultricies enim {{x}} {{y}}.'],
    ['c', 'Sed rhoncus lectus ac rhoncus {{z}}.'],
  ],
  ipsum: [
    ['a', 'vivamus ac pulvinar {{x}}'],
    ['empty', ''],
  ],
};

describe('TranslateService', () => {
  let service: TranslateService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [TranslateModule.forRoot([locale])],
    });
    service = TestBed.inject(TranslateService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should translate', () => {
    expect(service.translate('lorem', 'a')).toBe(
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit.'
    );
  });

  it('should translate with 2 parameters', () => {
    expect(service.translate('lorem', 'b', { x: 'rutrum', y: 'ut' })).toBe(
      'Etiam malesuada posuere libero, nec ultricies enim rutrum ut.'
    );
  });

  it('should translate with translated parameter', () => {
    expect(
      service.translate('lorem', 'c', {
        z: service.translate('ipsum', 'a', { x: 'felis' }),
      })
    ).toBe('Sed rhoncus lectus ac rhoncus vivamus ac pulvinar felis.');
  });

  it('should be empty string', () => {
    expect(service.translate('ipsum', 'empty')).toBe('');
  });

  it('should not be translated due to unknown dictionay', () => {
    expect(service.translate('unknown_dictionay', 'a')).toBe('{{a}}');
  });

  it('should not be translated due to unknown key', () => {
    expect(service.translate('ipsum', 'unknown_key')).toBe('{{unknown_key}}');
  });
});
