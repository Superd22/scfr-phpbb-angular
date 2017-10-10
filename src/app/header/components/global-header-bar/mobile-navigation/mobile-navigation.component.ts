import { Component, OnInit } from '@angular/core';
import {mainLinks} from 'app/header/enums/main-links.const';

@Component({
  selector: 'scfr-mobile-navigation',
  templateUrl: './mobile-navigation.component.html',
  styleUrls: ['./mobile-navigation.component.scss']
})
export class MobileNavigationComponent implements OnInit {
    public mainLinks = mainLinks;

    constructor(
    ) {}

    ngOnInit() {
    }

}
