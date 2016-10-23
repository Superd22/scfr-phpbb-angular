import { Component, OnInit } from '@angular/core';
import { PhpbbApiService } from '../phpbb-api.service';

@Component({
  selector: 'app-index',
  templateUrl: './index.component.html',
  styleUrls: ['./index.component.sass']
})
export class IndexComponent implements OnInit {

  constructor(public phpbbApi: PhpbbApiService) { }

  ngOnInit() {

  }

}
