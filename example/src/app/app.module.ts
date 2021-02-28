import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { CommonModule } from '@angular/common';
import { NgxComponentCellTableModule } from 'ngx-component-cell-table';
import { ColorNodeComponent } from './components/color-node/color-node.component';
import { FormsModule } from '@angular/forms';

@NgModule({
  declarations: [AppComponent, ColorNodeComponent],
  imports: [
    BrowserModule,
    CommonModule,
    NgxComponentCellTableModule,
    FormsModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
