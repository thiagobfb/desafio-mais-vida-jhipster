import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { DesafioMaisVidaSharedModule } from '../../shared';
import {
    MedicoMySuffixService,
    MedicoMySuffixPopupService,
    MedicoMySuffixComponent,
    MedicoMySuffixDetailComponent,
    MedicoMySuffixDialogComponent,
    MedicoMySuffixPopupComponent,
    MedicoMySuffixDeletePopupComponent,
    MedicoMySuffixDeleteDialogComponent,
    medicoRoute,
    medicoPopupRoute,
} from './';

const ENTITY_STATES = [
    ...medicoRoute,
    ...medicoPopupRoute,
];

@NgModule({
    imports: [
        DesafioMaisVidaSharedModule,
        RouterModule.forChild(ENTITY_STATES)
    ],
    declarations: [
        MedicoMySuffixComponent,
        MedicoMySuffixDetailComponent,
        MedicoMySuffixDialogComponent,
        MedicoMySuffixDeleteDialogComponent,
        MedicoMySuffixPopupComponent,
        MedicoMySuffixDeletePopupComponent,
    ],
    entryComponents: [
        MedicoMySuffixComponent,
        MedicoMySuffixDialogComponent,
        MedicoMySuffixPopupComponent,
        MedicoMySuffixDeleteDialogComponent,
        MedicoMySuffixDeletePopupComponent,
    ],
    providers: [
        MedicoMySuffixService,
        MedicoMySuffixPopupService,
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class DesafioMaisVidaMedicoMySuffixModule {}
