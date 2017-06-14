import { LayoutService } from './material/services/layout-service.service';
import { Component } from '@angular/core';

@Component({
    selector: 'scfr-phpbb',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss']
})

export class AppComponent {
    public title = 'SCFR PHPBB APP';
    public mode = "side";
    public toggle: boolean = true;

    constructor(private layout: LayoutService) {
        this.layout.gt_sm.subscribe((gt_sm) => {
            if (gt_sm) this.mode = "side";
            else this.mode = "over";
        });
    }
}
