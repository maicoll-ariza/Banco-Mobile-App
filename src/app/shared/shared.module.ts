import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ExpandComponent } from './components/expand/expand.component';



@NgModule({
  declarations: [
    ExpandComponent
  ],
  imports: [
    CommonModule
  ],
  exports: [
    ExpandComponent
  ]
})
export class SharedModule { }
