import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { MedicoMySuffix } from './medico-my-suffix.model';
import { MedicoMySuffixPopupService } from './medico-my-suffix-popup.service';
import { MedicoMySuffixService } from './medico-my-suffix.service';

@Component({
    selector: 'jhi-medico-my-suffix-delete-dialog',
    templateUrl: './medico-my-suffix-delete-dialog.component.html'
})
export class MedicoMySuffixDeleteDialogComponent {

    medico: MedicoMySuffix;

    constructor(
        private medicoService: MedicoMySuffixService,
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
    selector: 'jhi-medico-my-suffix-delete-popup',
    template: ''
})
export class MedicoMySuffixDeletePopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private medicoPopupService: MedicoMySuffixPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            this.medicoPopupService
                .open(MedicoMySuffixDeleteDialogComponent as Component, params['id']);
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
