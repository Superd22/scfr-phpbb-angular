import {Component, Input, OnInit} from '@angular/core';
import {mainLinks} from 'app/header/enums/main-links.const';
import {NavigationService} from 'app/services/navigation.service';

@Component({
  selector: 'scfr-mobile-navigation',
  templateUrl: './mobile-navigation.component.html',
  styleUrls: ['./mobile-navigation.component.scss']
})
export class MobileNavigationComponent implements OnInit {
    public mainLinks = mainLinks;
    @Input() toggle: boolean;

    constructor(
    ) {}

    ngOnInit() {
    }

}
