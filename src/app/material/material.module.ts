import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MdButtonModule, MdSelectModule, MdSidenavModule, MdIconModule, MdProgressBarModule, MdInputModule, MdTooltipModule, MdMenuModule } from '@angular/material';
import { MdProgressSpinnerModule, MdSnackBarModule, MdToolbarModule, MdAutocompleteModule, MdCheckboxModule } from '@angular/material';
import { MdCardModule, MdDialogModule } from '@angular/material';

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
];

@NgModule({
    imports: modules,
    exports: modules,
    declarations: []
})
export class SCFRMaterialModule { }
