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

}
