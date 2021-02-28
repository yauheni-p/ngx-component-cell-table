import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ColorNodeComponent } from './color-node.component';

describe('ColorNodeComponent', () => {
  let component: ColorNodeComponent;
  let fixture: ComponentFixture<ColorNodeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ColorNodeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ColorNodeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
