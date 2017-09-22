import { SCFRUIParam } from 'app/decorators/UIParam.decorator';
import { Component, OnInit } from '@angular/core';
import { PhpbbComponent } from "../phpbb/phpbb-component.component";

@Component({
  selector: 'scfr-forum-mcp',
  templateUrl: './mcp.component.html',
  styleUrls: ['./mcp.component.scss']
})
export class McpComponent extends PhpbbComponent {

  @SCFRUIParam("i")
  private _i;
  @SCFRUIParam("mode")
  private _mode;

  /** computed mode from phpbb selected sub-tab */
  public get computedMode(): string {
    let computedMode = null;

    if (this.tpl && this.tpl.t_block2)
      for (let i = 0; i < this.tpl.t_block2.length; i++) {
        if (this.tpl.t_block2[i].S_SELECTED) {
          computedMode = this.tpl.t_block2[i].MODE;
          break;
        }
      }

    return computedMode;
  }

  constructor() {
    super();
  }

  ngOnInit() {
    super.ngOnInit();
  }

  /**
   * Check if we're currently in a given state/mode
   * @param i the tab we want to check for
   * @param mode the mode we want to check for
   * @return boolean
   */
  public isIn(i: string | number, mode?: string): boolean {
    const map = {
      140: 'mcp_main', 'mcp_main': 140,
      141: 'mcp_queue', 'mcp_queue': 141,
      142: 'mcp_pm_reports', 'mcp_pm_reports': 142,
      143: 'mcp_notes', 'mcp_notes': 143,
      144: 'mcp_warn', 'mcp_warn': 144,
      145: 'mcp_logs', 'mcp_logs': 145,
      146: 'mcp_ban', 'mcp_ban': 146,
    };

    // Get our uiParam mode or the computed mode if need be.
    const curMod = this._mode || this.computedMode;


    // check if we're in the right tab -translated is ok- and if we have mode check it's the right one.
    return (i == this._i || i == map[this._i]) && (mode && curMod ? curMod == mode : true);
  }

}