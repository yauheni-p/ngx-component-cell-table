import {
  Component,
  OnInit,
  ChangeDetectionStrategy,
  EventEmitter,
  ViewContainerRef,
  ComponentFactoryResolver,
  OnDestroy,
  ComponentRef,
  Input,
  Output,
  ViewChild,
} from '@angular/core';
import { TableHeader } from '../../interfaces/table-header';
import { NodeEvent } from '../../interfaces/node-event';
import { DynamicNode } from '../dynamic-node';
import { Subscription } from 'rxjs';

@Component({
  selector: 'ngx-dynamic-node',
  templateUrl: './dynamic-node.component.html',
  styleUrls: ['./dynamic-node.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DynamicNodeComponent implements OnInit, OnDestroy {
  @Input() element: any;
  @Input() header!: TableHeader;
  @Output() nodeEvent: EventEmitter<NodeEvent> = new EventEmitter();

  @ViewChild('elseBlock', { static: true, read: ViewContainerRef })
  refNode!: ViewContainerRef;
  private subscription: Subscription | undefined;

  constructor(private componentFactoryResolver: ComponentFactoryResolver) {}

  ngOnInit(): void {
    if (this.header.component) {
      this.renderDynamicNode();
    }
  }

  ngOnDestroy(): void {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }

  private renderDynamicNode(): void {
    const componentFactory = this.componentFactoryResolver.resolveComponentFactory(
      this.header.component
    );

    this.refNode.clear();

    const componentRef = this.refNode.createComponent(
      componentFactory
    ) as ComponentRef<DynamicNode<any>>;

    componentRef.instance.element = this.element;

    componentRef.instance.header = this.header;

    this.subscription = componentRef.instance.nodeEvent.subscribe(
      (data: NodeEvent) => {
        this.nodeEvent.next(data);
      }
    );
  }
}
