import { UcpPhpbbFieldComponent } from './../../ucp/ucp-phpbb-field/ucp-phpbb-field.component';
import { QueryList } from '@angular/core';

/**
 * Describes a tab of posting options 
 */
export interface IPostingOptionContainer {
    getFields(): QueryList<UcpPhpbbFieldComponent>;
}