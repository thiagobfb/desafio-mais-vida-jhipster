import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { DesafioMaisVidaSharedModule } from '../../shared';
import {
    MedicoService,
    MedicoPopupService,
    MedicoComponent,
    MedicoDetailComponent,
    MedicoDialogComponent,
    MedicoPopupComponent,
    MedicoDeletePopupComponent,
    MedicoDeleteDialogComponent,
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
        MedicoComponent,
        MedicoDetailComponent,
        MedicoDialogComponent,
        MedicoDeleteDialogComponent,
        MedicoPopupComponent,
        MedicoDeletePopupComponent,
    ],
    entryComponents: [
        MedicoComponent,
        MedicoDialogComponent,
        MedicoPopupComponent,
        MedicoDeleteDialogComponent,
        MedicoDeletePopupComponent,
    ],
    providers: [
        MedicoService,
        MedicoPopupService,
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class DesafioMaisVidaMedicoModule {}
