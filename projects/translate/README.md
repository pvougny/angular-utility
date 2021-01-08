# Translate

The Angular library ``translate`` provides:

- The service `TranslateService` to help translate your texts with parameters from a class (component, service...).
- The pipe `PvoTranslatePipe` to translate your contents in views.

> Note that this library and its configuration (`angular.json`) are compliant with **Angular 5+**.

## Summary

- [Installation](#installation)
- [Configuration](#configuration)
- [Dictionaries](#dictionary)
- [Import TranslateModule with the dictionary](#import)
- [Translate in a class with injected service](#class)
- [Translate in a view with the PvoTranslate pipe](#view)
- [Serving the application](#serve)
- [Usage](#usage)

## <a name="installation"></a>Installation

```sh
npm install --save @olop/ng-translate
```

## <a name="configuration"></a>Configuration

By default, if you need only one language, no configuration is necessary, a default dictionary is used (`locale.ts`). Otherwise, you need to define configurations that will use a different dictionaries for other languages. Here is an example with a french dictionary (`locale.fr.ts`):

`angular.json` (**Angular 5+**)

```json
{
  "projects": {
    "my-application": {
      ...
      "architect": {
        "build": {
          ...
          "configurations": {
            "fr": {
              "fileReplacements": [
                {
                  "replace": "src/locales/locale.ts",
                  "with": "src/locales/locale.fr.ts"
                }
              ]
            }
          }
        },
        "serve": {
          ...
          "configurations": {
            "fr": {
              "browserTarget": "my-application:build:fr"
            }
          }
        },
        ...
      }
    }
  }
}

```

## <a name="dictionary"></a>Dictionaries

`locale.ts` (default)

```typescript
import { Locale } from '@olop/ng-translate';

const locale: Locale = {
  hello: [
    ['Hello world', 'Hello world'],
    ['My name is', 'My name is {{name}}'],
    ['Bob', 'Bob']
  ],
  welcome: [
    ['Welcome', 'Welcome'],
    ['Home', 'Home'],
  ],
};
```

`locale.fr.ts` (configuration `fr`)

```typescript
import { Locale } from '@olop/ng-translate';

const locale: Locale = {
  hello: [
    ['Hello world', 'Bonjour le monde'],
    ['My name is', "Je m'appelle {{name}}"],
    ['Bob', 'Robert']
  ],
  welcome: [
    ['Welcome', 'Bienvenue'],
    ['Home', 'Chez toi'],
  ],
};
```

## <a name="import"></a>Import TranslateModule with the dictionary

`app.module.ts`

```typescript
import { NgModule } from "@angular/core";
import { TranslateModule } from "@olop/ng-translate";
import { locale } from "./locales/locale";

@NgModule({
  imports: [TranslateModule.forRoot([locale])]
})
export class AppModule {}
```

## <a name="class"></a>Translate in a class with injected service

> Note that the service is injected by itself in root, then no need to provide it anywhere.

`my.component.ts`

```typescript
import { Component } from "@angular/core";
import { TranslateService } from "@olop/ng-translate";

@Component({
  template: "<p>{{ text }}</p>",
})
export class MyComponent {
  public text: string;

  constructor(translateService: TranslateService) {
    this.text = translateService.translate('hello', 'Hello world');
  }
}
```

## <a name="view"></a>Translate in a view with the pipe `PvoTranslatePipe`

`some-view.component.html`

```html
<p>{{ 'Hello world' | pvoTranslate:'hello' }}</p>
```

## <a name="serve"></a>Serving the application

By default, the English dictionary will be used (`locale.ts`):


```sh
ng serve my-application
```

To use french translations (`locale.fr.ts`), serve with the corresponding configuration:

```sh
ng serve my-application --configuration fr
```

## <a name="usage"></a>Usage

Translate a static text:

```typescript
this.text = translateService.translate('hello', 'Hello world');
// Bonjour le monde
```

```html
<p>{{ 'Hello world' | pvoTranslate:'hello' }}</p>
<!-- <p>Bonjour le monde</p> -->
```

Translate with interpolations:

```typescript
this.params = { name: 'Paul' };
this.text = translateService.translate('hello', 'My name is', this.params);
// => Je m'appelle Paul
```

```html
<p>{{ 'My name is' | pvoTranslate:'hello':params }}</p>
<!-- <p>Je m'appelle Paul</p> -->
```

Translate with translated interpolations:

```typescript
this.params = { name: translateService.translate('hello', 'Bob') };
this.text = translateService.translate('hello', 'My name is', this.params);
// => Je m'appelle Robert
```

```html
<p>{{ 'My name is' | pvoTranslate:'hello':params }}</p>
<!-- <p>Je m'appelle Robert</p> -->
```