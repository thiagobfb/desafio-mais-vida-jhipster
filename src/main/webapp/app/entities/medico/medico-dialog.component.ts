import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';

import { Observable } from 'rxjs/Observable';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { Medico } from './medico.model';
import { MedicoPopupService } from './medico-popup.service';
import { MedicoService } from './medico.service';

@Component({
    selector: 'jhi-medico-dialog',
    templateUrl: './medico-dialog.component.html'
})
export class MedicoDialogComponent implements OnInit {

    medico: Medico;
    isSaving: boolean;

    constructor(
        public activeModal: NgbActiveModal,
        private medicoService: MedicoService,
        private eventManager: JhiEventManager
    ) {
    }

    ngOnInit() {
        this.isSaving = false;
    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    save() {
        this.isSaving = true;
        if (this.medico.id !== undefined) {
            this.subscribeToSaveResponse(
                this.medicoService.update(this.medico));
        } else {
            this.subscribeToSaveResponse(
                this.medicoService.create(this.medico));
        }
    }

    private subscribeToSaveResponse(result: Observable<HttpResponse<Medico>>) {
        result.subscribe((res: HttpResponse<Medico>) =>
            this.onSaveSuccess(res.body), (res: HttpErrorResponse) => this.onSaveError());
    }

    private onSaveSuccess(result: Medico) {
        this.eventManager.broadcast({ name: 'medicoListModification', content: 'OK'});
        this.isSaving = false;
        this.activeModal.dismiss(result);
    }

    private onSaveError() {
        this.isSaving = false;
    }
}

@Component({
    selector: 'jhi-medico-popup',
    template: ''
})
export class MedicoPopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private medicoPopupService: MedicoPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            if ( params['id'] ) {
                this.medicoPopupService
                    .open(MedicoDialogComponent as Component, params['id']);
            } else {
                this.medicoPopupService
                    .open(MedicoDialogComponent as Component);
            }
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
