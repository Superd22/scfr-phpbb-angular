import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { McpMainMoveComponent } from './mcp-main-move.component';

describe('McpMainMoveComponent', () => {
  let component: McpMainMoveComponent;
  let fixture: ComponentFixture<McpMainMoveComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ McpMainMoveComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(McpMainMoveComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
