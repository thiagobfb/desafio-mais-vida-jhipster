import { Routes } from '@angular/router';

import { UserRouteAccessService } from '../../shared';
import { MedicoMySuffixComponent } from './medico-my-suffix.component';
import { MedicoMySuffixDetailComponent } from './medico-my-suffix-detail.component';
import { MedicoMySuffixPopupComponent } from './medico-my-suffix-dialog.component';
import { MedicoMySuffixDeletePopupComponent } from './medico-my-suffix-delete-dialog.component';

export const medicoRoute: Routes = [
    {
        path: 'medico-my-suffix',
        component: MedicoMySuffixComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'Medicos'
        },
        canActivate: [UserRouteAccessService]
    }, {
        path: 'medico-my-suffix/:id',
        component: MedicoMySuffixDetailComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'Medicos'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const medicoPopupRoute: Routes = [
    {
        path: 'medico-my-suffix-new',
        component: MedicoMySuffixPopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'Medicos'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'medico-my-suffix/:id/edit',
        component: MedicoMySuffixPopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'Medicos'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'medico-my-suffix/:id/delete',
        component: MedicoMySuffixDeletePopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'Medicos'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];
