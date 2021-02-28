import { Component, OnInit, ViewChild } from '@angular/core';
import {
  NodeEvent,
  PaginatorEvent,
  SortEvent,
  TableComponent,
  TableHeader,
  TableOptions,
} from 'ngx-component-cell-table';
import { Observable } from 'rxjs';
import { ColorNodeComponent } from './components/color-node/color-node.component';
import { map, shareReplay } from 'rxjs/operators';
import { PaginatedList } from './interfaces/paginated-list';
import { DataService } from './services/data.service';

const tableOptions: TableOptions = {
  hasHeader: true,
  isSelectable: true,
};

const tableHeaders: TableHeader[] = [
  {
    key: 'model',
    value: 'Model',
    isSortable: true,
  },
  {
    key: 'color',
    value: 'Color',
    component: ColorNodeComponent, // Pass here component inherited from DynamicNode<T> where T - type of your data source element.
  },
];

export interface Car {
  model: string;
  color: string;
}

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  headers: TableHeader[] = tableHeaders;
  options: TableOptions = tableOptions;
  page: number = 1;
  pageSize: number = 5;
  selectedItems: Car[] = [];

  cars$!: Observable<Car[]>;
  totalItems$!: Observable<number>;

  @ViewChild(TableComponent) table!: TableComponent;

  constructor(private service: DataService) {}

  ngOnInit(): void {
    this.fetchData();
  }

  onSelectionChange(selected: Car[]): void {
    this.selectedItems = selected;
  }

  onSortChange(event: SortEvent): void {
    this.table.clearSelection();
    this.reverse();
  }

  onNodeEvent(event: NodeEvent): void {
    console.log('Data from node:');
    console.log(event.data);

    console.log('Element value:');
    console.log(event.element);

    console.log('Header:');
    console.log(event.header);
  }

  onPageChange(event: PaginatorEvent): void {
    this.table.clearSelection();
    this.page = event.page;
    this.pageSize = event.pageSize;
    this.fetchData();
  }

  private fetchData(): void {
    const observable: Observable<PaginatedList<Car>> = this.service
      .get(this.page, this.pageSize)
      .pipe(shareReplay());

    this.totalItems$ = observable.pipe(map((data) => data.totalCount));
    this.cars$ = observable.pipe(map((data) => data.items));
  }

  private reverse(): void {
    this.table.clearSelection();
    this.service.reverse();
    this.fetchData();
  }
}
