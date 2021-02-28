import { Component, ChangeDetectionStrategy } from '@angular/core';

import { DynamicNode } from 'ngx-component-cell-table';
import { Car } from '../../app.component';

@Component({
  selector: 'app-color-node',
  templateUrl: './color-node.component.html',
  styleUrls: ['./color-node.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ColorNodeComponent extends DynamicNode<Car> {
  element: any;
  onClick() {
    this.emitData('Some data from node component');
    alert(`Car: ${this.element.model}, color: ${this.element.color}`);
  }
}
