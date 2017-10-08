import { Component, OnInit } from '@angular/core';
import {mainLinks} from 'app/header/enums/main-links.const';
import {GlobalHeaderService} from 'app/header/services/global-header.service';
import {BehaviorSubject} from 'rxjs/BehaviorSubject';

@Component({
  selector: 'scfr-mobile-navigation',
  templateUrl: './mobile-navigation.component.html',
  styleUrls: ['./mobile-navigation.component.scss']
})
export class MobileNavigationComponent implements OnInit {
    public mainLinks = mainLinks;
    public expanded: BehaviorSubject<boolean>;
    constructor(
        public navigation: GlobalHeaderService
    ) {}

    ngOnInit() {
        this.expanded = this.navigation.getMobileNavigation();
    }

}
