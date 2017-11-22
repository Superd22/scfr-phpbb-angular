import { DomSanitizer, SafeHtml } from '@angular/platform-browser/';
import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
    name: 'unsafeSrc'
})
export class UnsafeSrc implements PipeTransform {
    constructor(private _sanitizer: DomSanitizer) { }

    transform(html): SafeHtml {
        let safe = this._sanitizer.bypassSecurityTrustResourceUrl(html);
        this.handleAngularIssue(safe);
        return safe;
    }

    /**
     * As per 13/07/2017, it seems there is a bug in angular where SafeValue is converted to string even
     * on [property]=binding, so we need to ensure the strinfy goes well.
     */
    private handleAngularIssue(safe: SafeHtml) {
        Object.getPrototypeOf(safe).toString = function () { return this.changingThisBreaksApplicationSecurity; };
    }
} 