import { PhpbbComponent } from './../../phpbb/phpbb-component.component';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'scfr-forum-search-results',
  templateUrl: './search-results.component.html',
  styleUrls: ['./search-results.component.scss']
})
export class SearchResultsComponent extends PhpbbComponent {

  constructor() {
    super();
  }

  ngOnInit() {
    super.ngOnInit();
  }

  /**
   * Change the state based on a new page number
   * @param page the page to go to 
   */
  public changePage(page: number) {
    const postPerPage = 20;
    const start = page > 1 ? postPerPage * (page - 1) : undefined;
    let newParams = { start: start };

    // "egosearch" doesn't support pagination for some reason
    if (start && this.state.params['prettyMod'] == "auteur") {
      newParams['search_id'] = null;
      newParams['prettyMod'] = null;
    }
    console.log(start && this.state.params['prettyMod'] == "auteur", this.state.params, newParams, Object.assign({}, this.state.params, this.computeSearchParams(), newParams));
    this.state.go("phpbb.seo.search", Object.assign({}, this.state.params, this.computeSearchParams(), newParams));
  }

  /**
   * Named page search (egosearch...) can **not** be paginated.
   * PHPBB auto translate any pagination request to the equivalent search params.
   * 
   * This function computes those params
   * @return {} object of params to be sent to search.php
   */
  private computeSearchParams(): { [paramName: string]: string } {
    let params = {};
    if (this.tpl["U_SEARCH_WORDS"]) {
      let searchWords = this.tpl['U_SEARCH_WORDS'].replace("./search.php?", "");
      searchWords.split("&").forEach(paramValue => {
        let c = paramValue.split("=");
        params[c[0]] = c[1];
      });
    }

    return params;
  }
}
