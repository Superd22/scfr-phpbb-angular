import { SCFRLocalStorage } from './decorators/LocalStorage.decorator';
import { LayoutService } from './material/services/layout-service.service';
import { Component, OnInit } from '@angular/core';

@Component({
    selector: 'scfr-phpbb',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss']
})

export class AppComponent implements OnInit {

    public title = 'SCFR PHPBB APP';
    public mode = "side";
    @SCFRLocalStorage("navbar:toggle")
    public toggle: boolean;

    constructor(private layout: LayoutService) {
        this.layout.gt_sm.subscribe((gt_sm) => {
            if (gt_sm) this.mode = "side";
            else this.mode = "over";
        });
    }

    ngOnInit() {

    }



}
