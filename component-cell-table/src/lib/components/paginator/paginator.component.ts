import {
  Component,
  ChangeDetectionStrategy,
  OnChanges,
  Input,
  Output,
  EventEmitter,
  SimpleChanges,
} from '@angular/core';
import { PaginatorEvent } from '../../interfaces/paginator-event';

@Component({
  selector: 'ngx-paginator',
  templateUrl: './paginator.component.html',
  styleUrls: ['./paginator.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PaginatorComponent implements OnChanges {
  @Input() page: number = 1;
  @Input() pageSize: number = 20;
  @Input() pageSizeOptions: Array<number> = [];
  @Input() totalItems: number | null = 1;

  @Output() pageChange: EventEmitter<PaginatorEvent> = new EventEmitter();

  totalPages!: number;

  ngOnChanges(changes: SimpleChanges): void {
    this.recalculateSettings();
  }

  onLastPage(): void {
    this.page = this.totalPages ?? 1;
    this.emitPaginatorEvent();
  }

  onNextPage(): void {
    this.page += 1;
    this.emitPaginatorEvent();
  }

  onPreviousPage(): void {
    this.page -= 1;
    this.emitPaginatorEvent();
  }

  onFirstPage(): void {
    this.page = 1;
    this.emitPaginatorEvent();
  }

  recalculateSettings(): void {
    this.totalPages = this.totalItems
      ? this.pageSize
        ? Math.ceil(this.totalItems / this.pageSize)
        : 1
      : 1;
  }

  emitPaginatorEvent(): void {
    const event: PaginatorEvent = {
      page: this.page,
      pageSize: this.pageSize,
    };
    this.pageChange.emit(event);
  }
}
