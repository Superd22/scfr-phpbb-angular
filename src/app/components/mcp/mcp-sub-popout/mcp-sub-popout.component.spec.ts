import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { McpSubPopoutComponent } from './mcp-sub-popout.component';

describe('McpSubPopoutComponent', () => {
  let component: McpSubPopoutComponent;
  let fixture: ComponentFixture<McpSubPopoutComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ McpSubPopoutComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(McpSubPopoutComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
