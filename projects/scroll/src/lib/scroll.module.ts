import { NgModule } from '@angular/core';
import { RestoreScrollPositionDirective } from './restore-scroll-position.directive';

@NgModule({
  declarations: [RestoreScrollPositionDirective],
  exports: [RestoreScrollPositionDirective],
})
export class ScrollModule {}
