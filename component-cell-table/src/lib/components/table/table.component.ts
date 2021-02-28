import {
  Component,
  EventEmitter,
  Input,
  Output,
  TemplateRef,
} from '@angular/core';
import { TableHeader } from '../../interfaces/table-header';
import { NodeEvent } from '../../interfaces/node-event';
import { SortEvent } from '../../interfaces/sort-event';
import { TableOptions } from '../../interfaces/table-options';
import { PaginatorEvent } from '../../interfaces/paginator-event';

const defaultOptions: TableOptions = {
  hasHeader: true,
  isSelectable: false,
};

@Component({
  selector: 'ngx-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.scss'],
})
export class TableComponent {
  @Input() headers: TableHeader[] = [];
  @Input() data: any[] | null = [];
  @Input() options: TableOptions = defaultOptions;
  @Input() paginatorTemplate: TemplateRef<any> | undefined;
  @Input() pageSize: number = 20;
  @Input() totalItems!: number | null;
  @Output() nodeEvent: EventEmitter<NodeEvent> = new EventEmitter();
  @Output() sortChange: EventEmitter<SortEvent> = new EventEmitter();
  @Output() selectionChange: EventEmitter<any[]> = new EventEmitter();
  @Output() pageChange: EventEmitter<PaginatorEvent> = new EventEmitter();

  checkAllState: boolean = false;

  activeSortHeaderValue: boolean = false;
  private selectedItems: any[] = [];
  private activeSortHeader: TableHeader | undefined;

  onNodeEvent(event: NodeEvent): void {
    this.nodeEvent.next(event);
  }

  onSortChange(header: TableHeader, value: boolean): void {
    this.activeSortHeader = header;
    this.activeSortHeaderValue = value;
    this.sortChange.emit({
      header,
      value,
    });
  }

  onCheckAllChange(state: boolean): void {
    return this.checkAllState ? this.selectAll() : this.clearSelection();
  }

  isChecked(row: any): boolean {
    return this.selectedItems.indexOf(row) > -1;
  }

  onElementSelected(row: any, checked: boolean): void {
    return checked ? this.addSelected(row) : this.removeSelected(row);
  }

  isActiveHeader(header: TableHeader): boolean {
    return this.activeSortHeader === header;
  }

  onPageChange(event: PaginatorEvent) {
    this.clearSelection();
    this.pageChange.emit(event);
  }

  public clearSelection(): void {
    if (this.checkAllState) {
      this.checkAllState = false;
    }
    this.selectedItems = [];
    this.emitSelection();
  }

  private selectAll(): void {
    this.selectedItems = this.data ? [...this.data] : [];
    this.emitSelection();
  }

  private addSelected(row: any): void {
    this.selectedItems.push(row);
    if (this.selectedItems.length === this.data?.length) {
      this.checkAllState = true;
    }
    this.emitSelection();
  }

  private removeSelected(row: any): void {
    const index = this.selectedItems.indexOf(row);
    if (index > -1) {
      this.selectedItems.splice(index, 1);
    }
    this.checkAllState = false;
    this.emitSelection();
  }

  private emitSelection(): void {
    this.selectionChange.emit(this.selectedItems);
  }
}
