import {
  Directive,
  EmbeddedViewRef,
  Input,
  OnDestroy,
  TemplateRef,
  ViewContainerRef,
} from '@angular/core';

export class Context {
  public $implicit: any;
  public condition: boolean;
}

@Directive({
  selector: '[pvoAttach]',
})
export class AttachDirective implements OnDestroy {
  @Input()
  set pvoAttach(condition: boolean) {
    this._context.$implicit = condition;
    this._context.condition = condition;
    this._updateView();
  }

  private readonly _context: Context = new Context();
  private _viewRef: EmbeddedViewRef<Context> | null = null;
  private _attached: boolean;
  private _scrollLevels: Map<Element, { top: number; left: number }>;

  constructor(
    private readonly _viewContainer: ViewContainerRef,
    private readonly _templateRef: TemplateRef<Context>
  ) {}

  public ngOnDestroy(): void {
    if (this._viewRef) {
      this._viewRef.destroy();
    }
  }

  private _updateView(): void {
    if (!!this._context.$implicit) {
      if (!this._viewRef) {
        this._viewRef = this._viewContainer.createEmbeddedView(
          this._templateRef,
          this._context
        );
      } else if (!this._attached) {
        this._viewContainer.insert(this._viewRef);
        this._restoreScrollLevels();
      }
      this._attached = true;
    } else {
      if (this._attached) {
        this._saveScrollLevels();
        this._viewContainer.detach(0);

        // force earlier remove for scroll position retrievement
        for (let i = 0; i < this._viewRef.rootNodes.length; i++) {
          this._viewRef.rootNodes[i].parentElement?.removeChild(
            this._viewRef.rootNodes[i]
          );
        }
      }

      this._attached = false;
    }
  }

  private _saveScrollLevels(): void {
    this._scrollLevels = new Map();
    for (const node of this._viewRef.rootNodes) {
      this._saveScrollLevelsRecursive(node);
    }
  }

  private _restoreScrollLevels(): void {
    for (const [el, level] of this._scrollLevels) {
      el.scrollLeft = level.left;
      el.scrollTop = level.top;
    }
  }

  private _saveScrollLevelsRecursive(el: Node): void {
    if (this._isElement(el)) {
      this._scrollLevels.set(el, { left: el.scrollLeft, top: el.scrollTop });
      for (let i = 0; i < el.children.length; i++) {
        this._saveScrollLevelsRecursive(el.children[i]);
      }
    }
  }

  private _isElement(node: Node): node is Element {
    return (<Element>node).children != null;
  }
}
