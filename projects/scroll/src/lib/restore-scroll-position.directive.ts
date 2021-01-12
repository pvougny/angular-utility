import { AfterViewChecked, Directive, ElementRef, Input } from '@angular/core';

@Directive({
  selector: '[pvoRestoreScrollPosition]',
})
export class RestoreScrollPositionDirective implements AfterViewChecked {
  @Input('pvoRestoreScrollPosition')
  set attachedContent(attachedContent: string) {
    if (this._attachedContent !== attachedContent) {
      if (this._attachedContent != null) {
        this._saveScroll();
      }

      this._attachedContent = attachedContent;
      this._contentChanged = true;
    }
  }

  @Input()
  set scrollTarget(target: 'html' | Element) {
    this._scrollTarget = target === 'html' ? document.documentElement : target;
  }

  private _scrollTarget: Element;
  private _scrollMap: Map<string, { top: number; left: number }> = new Map();
  private _attachedContent: string;
  private _contentChanged: boolean;

  constructor(elementRef: ElementRef) {
    this._scrollTarget = elementRef.nativeElement;
  }

  public ngAfterViewChecked(): void {
    if (this._contentChanged) {
      this._contentChanged = false;
      this._setScroll(
        this._scrollMap.get(this._attachedContent) || { top: 0, left: 0 }
      );
    }
  }

  private _setScroll(scroll: { top: number; left: number }): void {
    if (this._scrollTarget) {
      this._scrollTarget.scrollTop = scroll.top;
      this._scrollTarget.scrollLeft = scroll.left;
    }
  }

  private _saveScroll(): void {
    this._scrollMap.set(this._attachedContent, {
      top: this._scrollTarget.scrollTop,
      left: this._scrollTarget.scrollLeft,
    });
  }
}
