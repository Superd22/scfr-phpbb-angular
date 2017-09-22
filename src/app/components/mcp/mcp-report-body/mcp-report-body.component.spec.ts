import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { McpReportBodyComponent } from './mcp-report-body.component';

describe('McpReportBodyComponent', () => {
  let component: McpReportBodyComponent;
  let fixture: ComponentFixture<McpReportBodyComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ McpReportBodyComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(McpReportBodyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
