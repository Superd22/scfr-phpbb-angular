import { PhpbbSubComponent } from './../../../../components/phpbb/phpbb-sub-component.component';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'scfr-forum-viewtopic-guild-details',
  templateUrl: './viewtopic-guild-details.component.html',
  styleUrls: ['./viewtopic-guild-details.component.scss']
})
export class ViewtopicGuildDetailsComponent extends PhpbbSubComponent implements OnInit {

  public get commitment(): string {
    switch (this.tpl.GUILD_COMMITMENT) {
      case "Regular": return "Normal";
      case "Hardcore": return "Hardcore";
      case "Casual": return "Casual";
    }

    return this.tpl.GUILD_COMMITMENT
  }

  public get archetype(): string {
    switch (this.tpl.GUILD_ARCHETYPE) {
      case "Organization": return "Organisation";
      case "Faith": return "Foi";
      case "Syndicate": return "Syndicat";
    }
    return this.tpl.GUILD_ARCHETYPE
  }

  public get lastMaj(): string {
    return new Date(Number(this.tpl.GUILD_LAST_SCRAPE_DATE) * 1000).toLocaleDateString();
  }

  public newOrgName: string;

  /**
   * If the current user can admin this org
   */
  public get canAdmin(): boolean {
    // If we're connected and the O.P of this thread, or a >=mod.
    return (Number(this.tpl.CURRENT_USER_ID) > 1 && Number(this.tpl.TOPIC_POSTER) === Number(this.tpl.CURRENT_USER_ID))
      || this.tpl.quickmod
  }

  public get orgNameChanged(): boolean {
    return this.newOrgName != this.tpl.GUILD_SID;
  }

  constructor() {
    super();
  }

  ngOnInit() {
    super.ngOnInit();
    this.newOrgName = this.tpl.GUILD_SID;
  }

  public delAssoc() {
    const ok = confirm("Êtes vous sur de vouloir supprimer cette association ?");
    if (!ok) return;


    this.phpbbApi.getPage("app.php/scfr/main/org/", { mode: "delete", topic: this.tpl.TOPIC_ID }).subscribe((data: any) => {
      this.callbackOrg(data);
    });
  }

  /**
   * shared callback after api call
   * @param data 
   */
  protected callbackOrg(data: { err: boolean, msg: string }) {
    if (data.err) this.phpbbApi.errorSnackBar("Erreur! " + data.msg);
    else {
      this.phpbbApi.openSnackBar("C'est fait !");
      this.translate.reload();
    }
  }

  public assoc() {
    if (!this.newOrgName || this.newOrgName.length < 3) return;
    const ok = confirm("Êtes vous sur de vouloir associer ce topic à l'organisation #" + this.newOrgName + " ?");
    if (!ok) return;


    this.phpbbApi.getPage("app.php/scfr/main/org/", { ssid: this.newOrgName, topic: this.tpl.TOPIC_ID }).subscribe((data: any) => {
      this.callbackOrg(data);
    });

  }


}
