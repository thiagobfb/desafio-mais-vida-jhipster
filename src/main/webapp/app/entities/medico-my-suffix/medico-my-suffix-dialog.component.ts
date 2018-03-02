import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';

import { Observable } from 'rxjs/Observable';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { MedicoMySuffix } from './medico-my-suffix.model';
import { MedicoMySuffixPopupService } from './medico-my-suffix-popup.service';
import { MedicoMySuffixService } from './medico-my-suffix.service';

@Component({
    selector: 'jhi-medico-my-suffix-dialog',
    templateUrl: './medico-my-suffix-dialog.component.html'
})
export class MedicoMySuffixDialogComponent implements OnInit {

    medico: MedicoMySuffix;
    isSaving: boolean;

    constructor(
        public activeModal: NgbActiveModal,
        private medicoService: MedicoMySuffixService,
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

    private subscribeToSaveResponse(result: Observable<HttpResponse<MedicoMySuffix>>) {
        result.subscribe((res: HttpResponse<MedicoMySuffix>) =>
            this.onSaveSuccess(res.body), (res: HttpErrorResponse) => this.onSaveError());
    }

    private onSaveSuccess(result: MedicoMySuffix) {
        this.eventManager.broadcast({ name: 'medicoListModification', content: 'OK'});
        this.isSaving = false;
        this.activeModal.dismiss(result);
    }

    private onSaveError() {
        this.isSaving = false;
    }
}

@Component({
    selector: 'jhi-medico-my-suffix-popup',
    template: ''
})
export class MedicoMySuffixPopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private medicoPopupService: MedicoMySuffixPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            if ( params['id'] ) {
                this.medicoPopupService
                    .open(MedicoMySuffixDialogComponent as Component, params['id']);
            } else {
                this.medicoPopupService
                    .open(MedicoMySuffixDialogComponent as Component);
            }
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
