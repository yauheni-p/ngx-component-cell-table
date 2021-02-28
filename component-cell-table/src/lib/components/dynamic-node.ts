import { Component, Input } from '@angular/core';
import { Subject } from 'rxjs';
import { TableHeader } from '../interfaces/table-header';
import { NodeEvent } from '../interfaces/node-event';

@Component({
  template: '',
})
export abstract class DynamicNode<T> {
  @Input() element!: T;
  @Input() header!: TableHeader;
  nodeEvent: Subject<NodeEvent> = new Subject();

  emitData(data: any) {
    this.nodeEvent.next({
      data: data,
      element: this.element,
      header: this.header,
    });
  }
}
