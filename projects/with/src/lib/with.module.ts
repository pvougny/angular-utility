import { NgModule } from '@angular/core';
import { WithDirective } from './with.directive';

@NgModule({
  declarations: [WithDirective],
  exports: [WithDirective],
})
export class WithModule {}
