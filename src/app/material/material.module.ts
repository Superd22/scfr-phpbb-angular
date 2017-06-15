import { UiServiceService } from './services/ui-service.service';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MdButtonModule, MdSelectModule, MdSidenavModule, MdIconModule, MdProgressBarModule, MdInputModule, MdTooltipModule, MdMenuModule } from '@angular/material';
import { MdProgressSpinnerModule, MdSnackBarModule, MdToolbarModule, MdAutocompleteModule, MdCheckboxModule } from '@angular/material';
import { MdCardModule, MdDialogModule, MdTabsModule } from '@angular/material';
import { LayoutService } from "./services/layout-service.service";

let modules = [
    MdButtonModule,
    MdSelectModule,
    MdSidenavModule,
    MdIconModule,
    MdMenuModule,
    MdProgressBarModule,
    MdInputModule,
    MdTooltipModule,
    MdProgressSpinnerModule,
    MdSnackBarModule,
    MdToolbarModule,
    MdAutocompleteModule,
    MdCheckboxModule,
    MdCardModule,
    MdDialogModule,
    MdTabsModule
];

@NgModule({
    imports: modules,
    exports: modules,
    declarations: [],
    providers: [LayoutService, UiServiceService]
})
export class SCFRMaterialModule { }
