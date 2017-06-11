/**
 * Describes a simple post object that can be displayed by the viewmessage component
 */
import { SafeHtml } from "@angular/platform-browser/";

export interface SimplePost {
    subject: string,
    message: string | SafeHtml,
    id: number,
}
