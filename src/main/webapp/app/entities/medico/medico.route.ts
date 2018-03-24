import { Routes } from '@angular/router';

import { UserRouteAccessService } from '../../shared';
import { MedicoComponent } from './medico.component';
import { MedicoDetailComponent } from './medico-detail.component';
import { MedicoPopupComponent } from './medico-dialog.component';
import { MedicoDeletePopupComponent } from './medico-delete-dialog.component';

export const medicoRoute: Routes = [
    {
        path: 'medico',
        component: MedicoComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'desafioMaisVidaApp.medico.home.title'
        },
        canActivate: [UserRouteAccessService]
    }, {
        path: 'medico/:id',
        component: MedicoDetailComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'desafioMaisVidaApp.medico.home.title'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const medicoPopupRoute: Routes = [
    {
        path: 'medico-new',
        component: MedicoPopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'desafioMaisVidaApp.medico.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'medico/:id/edit',
        component: MedicoPopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'desafioMaisVidaApp.medico.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'medico/:id/delete',
        component: MedicoDeletePopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'desafioMaisVidaApp.medico.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];
