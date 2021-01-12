# With

The Angular library `with` provides the structural directive `WithDirective` that allows you to contextualize parts of your views.

## Summary

- [Installation](#installation)
- [Import WithModule](#import)
- [Usage](#usage)

## <a name="installation"></a>Installation

```sh
npm install --save @olop/ng-with
```

## <a name="import"></a>Import `WithModule`

`my.module.ts`

```typescript
import { NgModule } from "@angular/core";
import { WithModule } from "@olop/ng-with";

@NgModule({
  imports: [WithModule],
})
export class MyModule {}
```

## <a name="usage"></a>Usage

`my.component.ts`

```typescript
import { Component } from "@angular/core";
import { Observable, of } from "rxjs";

interface Gear {
  brand: string;
  model: string;
  nbVoice: number;
  nbKeys: number;
}

@Component({
  templateUrl: "./my.component.html",
})
export class MyComponent {
  public record: Gear[] = [
    {
      brand: "Roland",
      model: "G-800",
      nbVoice: 128,
      nbKeys: 76,
    },
    {
      brand: "Korg",
      model: "Triton",
      nbVoice: 62,
      nbKeys: 61,
    },
  ];

  public o$: Observable<Gear>;

  constructor() {
    this.o$ = of(this.record[1]);
  }
}
```

`my.component.html`

```html
<ng-container *pvoWith="record[0] as o">
  <p>{{ o.brand }} {{ o.model }}, {{o.nbVoice}} voices polyphony.</p>
</ng-container>

<ng-container *pvoWith="o$ | async as o">
  <p>{{ o.brand }} {{ o.model }}, {{o.nbKeys}} notes keyboard.</p>
</ng-container>
```
