# Scroll

The Angular library `scroll` provides the directive `RestoreScrollPositionDirective` that restores scroll position of reattached elements.

## Summary

- [Installation](#installation)
- [Import ScrollModule](#import)
- [Usage](#usage)

## <a name="installation"></a>Installation

```sh
npm install --save @olop/ng-scroll
```

## <a name="import"></a>Import `ScrollModule`

`my.module.ts`

```typescript
import { NgModule } from "@angular/core";
import { ScrollModule } from "@olop/ng-scroll";

@NgModule({
  imports: [ScrollModule],
})
export class MyModule {}
```

## <a name="usage"></a>Usage

`my.component.ts`

```typescript
import { Component } from "@angular/core";

interface Item {
  id: string;
  label: string;
  content: string;
}

@Component({
  templateUrl: "./my.component.html",
  styles: [
    `
      .scrollable-content {
        width: 200px;
        height: 100px;
        overflow: auto;
      }
    `,
  ],
})
export class MyComponent {
  public items: Item[] = [
    {
      id: "gear",
      label: "Gear",
      content: `Lorem, ipsum dolor sit amet consectetur adipisicing elit. Quos iusto laborum dolore quam neque! Enim impedit, a cupiditate dignissimos commodi minima eius perferendis accusamus nihil soluta aspernatur iure culpa? Quisquam!`,
    },
    {
      id: "video",
      label: "Video",
      content: `Lorem ipsum dolor sit amet consectetur adipisicing elit. Atque sed quisquam veritatis, iure nobis voluptatum, distinctio eum veniam iusto maiores vero soluta ab voluptas minima quas eius consequuntur aliquid. Delectus!`,
    },
  ];

  public itemActive: Item = this.items[0];

  constructor() {}

  public activeItem(item: Item): void {
    this.itemActive = item;
  }
}
```

`my.component.html`

```html
<nav>
  <button *ngFor="let item of items" (click)="activeItem(item)">
    Navigate to {{ item.label }}
  </button>
</nav>

<div
  #self
  class="scrollable-content"
  [pvoRestoreScrollPosition]="itemActive.id"
  [scrollTarget]="self"
>
  <ng-container *ngFor="let item of items">
    <div *ngIf="itemActive === item">{{ item.content }}</div>
  </ng-container>
</div>
```
