# Attach

The Angular library `attach` provides the structural directive `AttachDirective` that detaches and caches elements from the DOM when not displayed and reattaches them when displayed again.

## Summary

- [Installation](#installation)
- [Import AttachModule](#import)
- [Usage](#usage)

## <a name="installation"></a>Installation

```sh
npm install --save @olop/ng-attach
```

## <a name="import"></a>Import `AttachModule`

`my.module.ts`

```typescript
import { NgModule } from "@angular/core";
import { AttachModule } from "@olop/ng-attach";

@NgModule({
  imports: [AttachModule],
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

  public itemActive: number = this.items[0];

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

<ng-container *ngFor="let item of items">
  <div class="scrollable-content" *pvoAttach="itemActive === item">
    {{ item.content }}
  </div>
</ng-container>
```
