import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { Subscription } from 'rxjs/Subscription';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { UsuarioMySuffix } from './usuario-my-suffix.model';
import { UsuarioMySuffixService } from './usuario-my-suffix.service';
import { Principal } from '../../shared';

@Component({
    selector: 'jhi-usuario-my-suffix',
    templateUrl: './usuario-my-suffix.component.html'
})
export class UsuarioMySuffixComponent implements OnInit, OnDestroy {
usuarios: UsuarioMySuffix[];
    currentAccount: any;
    eventSubscriber: Subscription;

    constructor(
        private usuarioService: UsuarioMySuffixService,
        private jhiAlertService: JhiAlertService,
        private eventManager: JhiEventManager,
        private principal: Principal
    ) {
    }

    loadAll() {
        this.usuarioService.query().subscribe(
            (res: HttpResponse<UsuarioMySuffix[]>) => {
                this.usuarios = res.body;
            },
            (res: HttpErrorResponse) => this.onError(res.message)
        );
    }
    ngOnInit() {
        this.loadAll();
        this.principal.identity().then((account) => {
            this.currentAccount = account;
        });
        this.registerChangeInUsuarios();
    }

    ngOnDestroy() {
        this.eventManager.destroy(this.eventSubscriber);
    }

    trackId(index: number, item: UsuarioMySuffix) {
        return item.id;
    }
    registerChangeInUsuarios() {
        this.eventSubscriber = this.eventManager.subscribe('usuarioListModification', (response) => this.loadAll());
    }

    private onError(error) {
        this.jhiAlertService.error(error.message, null, null);
    }
}
