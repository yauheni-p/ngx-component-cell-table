import { TableHeader } from './table-header';

export interface SortEvent {
  header: TableHeader;
  value: boolean;
}
