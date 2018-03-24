import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { Medico } from './medico.model';
import { MedicoPopupService } from './medico-popup.service';
import { MedicoService } from './medico.service';

@Component({
    selector: 'jhi-medico-delete-dialog',
    templateUrl: './medico-delete-dialog.component.html'
})
export class MedicoDeleteDialogComponent {

    medico: Medico;

    constructor(
        private medicoService: MedicoService,
        public activeModal: NgbActiveModal,
        private eventManager: JhiEventManager
    ) {
    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    confirmDelete(id: string) {
        this.medicoService.delete(id).subscribe((response) => {
            this.eventManager.broadcast({
                name: 'medicoListModification',
                content: 'Deleted an medico'
            });
            this.activeModal.dismiss(true);
        });
    }
}

@Component({
    selector: 'jhi-medico-delete-popup',
    template: ''
})
export class MedicoDeletePopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private medicoPopupService: MedicoPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            this.medicoPopupService
                .open(MedicoDeleteDialogComponent as Component, params['id']);
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
