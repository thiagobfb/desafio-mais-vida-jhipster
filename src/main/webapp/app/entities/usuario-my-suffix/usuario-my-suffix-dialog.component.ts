import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';

import { Observable } from 'rxjs/Observable';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { UsuarioMySuffix } from './usuario-my-suffix.model';
import { UsuarioMySuffixPopupService } from './usuario-my-suffix-popup.service';
import { UsuarioMySuffixService } from './usuario-my-suffix.service';

@Component({
    selector: 'jhi-usuario-my-suffix-dialog',
    templateUrl: './usuario-my-suffix-dialog.component.html'
})
export class UsuarioMySuffixDialogComponent implements OnInit {

    usuario: UsuarioMySuffix;
    isSaving: boolean;

    constructor(
        public activeModal: NgbActiveModal,
        private usuarioService: UsuarioMySuffixService,
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
        if (this.usuario.id !== undefined) {
            this.subscribeToSaveResponse(
                this.usuarioService.update(this.usuario));
        } else {
            this.subscribeToSaveResponse(
                this.usuarioService.create(this.usuario));
        }
    }

    private subscribeToSaveResponse(result: Observable<HttpResponse<UsuarioMySuffix>>) {
        result.subscribe((res: HttpResponse<UsuarioMySuffix>) =>
            this.onSaveSuccess(res.body), (res: HttpErrorResponse) => this.onSaveError());
    }

    private onSaveSuccess(result: UsuarioMySuffix) {
        this.eventManager.broadcast({ name: 'usuarioListModification', content: 'OK'});
        this.isSaving = false;
        this.activeModal.dismiss(result);
    }

    private onSaveError() {
        this.isSaving = false;
    }
}

@Component({
    selector: 'jhi-usuario-my-suffix-popup',
    template: ''
})
export class UsuarioMySuffixPopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private usuarioPopupService: UsuarioMySuffixPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            if ( params['id'] ) {
                this.usuarioPopupService
                    .open(UsuarioMySuffixDialogComponent as Component, params['id']);
            } else {
                this.usuarioPopupService
                    .open(UsuarioMySuffixDialogComponent as Component);
            }
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
