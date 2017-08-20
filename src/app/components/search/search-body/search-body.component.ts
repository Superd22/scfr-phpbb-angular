import { StateService } from '@uirouter/angular';
import { UcpPhpbbFieldComponent } from './../../ucp/ucp-phpbb-field/ucp-phpbb-field.component';
import { PhpbbFormHelperService } from './../../../services/phpbb-form-helper.service';
import { IPhpbbTemplate } from 'app/interfaces/phpbb/phpbb-tpl';
import { PhpbbComponent } from './../../phpbb/phpbb-component.component';
import { Component, OnInit, Input, ViewChildren, QueryList } from '@angular/core';

@Component({
  selector: 'scfr-forum-search-body',
  templateUrl: './search-body.component.html',
  styleUrls: ['./search-body.component.scss']
})
export class SearchBodyComponent extends PhpbbComponent {

  public searchForumOptions;
  public searchCharacterOptions;

  @ViewChildren(UcpPhpbbFieldComponent)
  public _fields: QueryList<UcpPhpbbFieldComponent>;

  constructor(protected formHelper: PhpbbFormHelperService) {
    super();
  }

  ngOnInit() {
    super.ngOnInit();
    this.searchForumOptions = this.formHelper.getOptionsAsObject(this.tpl["S_FORUM_OPTIONS"]);
    console.log(this.searchForumOptions, this.tpl["S_FORUM_OPTIONS"], this.tpl);
    this.searchCharacterOptions = this.formHelper.getOptionsAsObject(this.tpl["S_CHARACTER_OPTIONS"]);
  }

  public submit() {
    let hiddens = this.formHelper.getHiddensFromTemplateAsObject(this.tpl);
    let searchParams = this.formHelper.getFieldsFromFieldComponent(this._fields);

    let params = Object.assign(hiddens, searchParams, {submit: 'envoyer'});

    this.state.go("phpbb.seo.search", params);
  }

  public reset() {
    this.formHelper.resetAll();
  }

}
