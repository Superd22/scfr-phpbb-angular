import { UcpSubPageFormComponent } from './../../ucp-sub-page-form/ucp-sub-page-form.component';
import { UcpComponent } from './../../ucp.component';
import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'scfr-forum-ucp-profil-avatar',
  templateUrl: './ucp-profil-avatar.component.html',
  styleUrls: ['./ucp-profil-avatar.component.scss']
})
export class UcpProfilAvatarComponent extends UcpSubPageFormComponent implements OnInit {

  public avatarDriverOptions: { id: string, name: string, explain: string, output: any }[] = [];
  public selectedDriver: string;

  constructor() {
    super();
  }

  ngOnInit() {
    this.handleAvatarDrivers();
  }

  public get currentDriver() {
    return this.avatarDriverOptions.find((elem) => elem.id == this.selectedDriver);
  }

  private handleAvatarDrivers() {
    this.ucp.tpl.avatar_drivers.forEach((driver) => {
      if (driver.SELECTED) this.selectedDriver = driver.DRIVER;
      this.avatarDriverOptions.push({ id: driver.DRIVER, name: driver.L_TITLE, explain: driver.L_EXPLAIN, output: this.getDriveOutputAsForms(driver) });
    });
  }

  private getDriveOutputAsForms(driver) {
    let inputs = [];

    let labelRegex = /<label for=["']([^"']*)['"]>(.*?)<\/label>/gmi;
    let labelMatch = labelRegex.exec(driver.OUTPUT);
    let labelMap: Map<string, string> = new Map<string, string>();
    while (labelMatch != null) {
      labelMap.set(labelMatch[1], labelMatch[2]);
      labelMatch = labelRegex.exec(driver.OUTPUT);
    }

    let inputRegex = /<input(.*?)\/>/gmi
    let inputMatch = inputRegex.exec(driver.OUTPUT);
    while (inputMatch != null) {
      inputs.push(inputMatch[0]);
      inputMatch = inputRegex.exec(driver.OUTPUT);
    }

    return { labelMap: labelMap, inputs: inputs };
  }

}
