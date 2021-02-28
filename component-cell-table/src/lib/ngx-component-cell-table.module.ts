import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TableComponent } from './components/table/table.component';
import { DynamicNodeComponent } from './components/dynamic-node/dynamic-node.component';
import { TableSortComponent } from './components/table-sort/table-sort.component';
import { FormsModule } from '@angular/forms';
import { PaginatorComponent } from './components/paginator/paginator.component';

@NgModule({
  imports: [CommonModule, FormsModule],
  declarations: [TableComponent, DynamicNodeComponent, TableSortComponent, PaginatorComponent],
  exports: [TableComponent]
})
export class NgxComponentCellTableModule {}
