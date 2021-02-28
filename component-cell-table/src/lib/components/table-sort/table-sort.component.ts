import {
  Component,
  ChangeDetectionStrategy,
  Input,
  Output,
  EventEmitter,
} from '@angular/core';

@Component({
  selector: 'ngx-table-sort',
  templateUrl: './table-sort.component.html',
  styleUrls: ['./table-sort.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TableSortComponent {
  @Output() sortChange: EventEmitter<boolean> = new EventEmitter();
  @Input() sortOrder: boolean = false;
  @Input() isActive: boolean = false;

  onClick(): void {
    this.sortOrder = !this.sortOrder;
    this.sortChange.emit(this.sortOrder);
  }
}
