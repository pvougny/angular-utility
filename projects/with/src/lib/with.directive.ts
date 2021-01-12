import {
  Directive,
  Input,
  OnDestroy,
  TemplateRef,
  ViewContainerRef,
} from '@angular/core';

interface WithContext<T> {
  $implicit: T;
  pvoWith: T;
}

@Directive({
  selector: '[pvoWith]',
})
export class WithDirective<T> implements OnDestroy {
  private readonly _context: WithContext<T>;

  @Input()
  set pvoWith(value: T) {
    this._context.$implicit = value;
    this._context.pvoWith = value;
  }

  constructor(
    private readonly viewContainerRef: ViewContainerRef,
    private readonly templateRef: TemplateRef<WithContext<T>>
  ) {
    this._context = { $implicit: null, pvoWith: null };
    this.viewContainerRef.createEmbeddedView(this.templateRef, this._context);
  }

  public ngOnDestroy(): void {
    this.viewContainerRef.clear();
  }
}
