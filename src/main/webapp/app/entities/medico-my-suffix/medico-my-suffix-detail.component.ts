import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs/Subscription';
import { JhiEventManager } from 'ng-jhipster';

import { MedicoMySuffix } from './medico-my-suffix.model';
import { MedicoMySuffixService } from './medico-my-suffix.service';

@Component({
    selector: 'jhi-medico-my-suffix-detail',
    templateUrl: './medico-my-suffix-detail.component.html'
})
export class MedicoMySuffixDetailComponent implements OnInit, OnDestroy {

    medico: MedicoMySuffix;
    private subscription: Subscription;
    private eventSubscriber: Subscription;

    constructor(
        private eventManager: JhiEventManager,
        private medicoService: MedicoMySuffixService,
        private route: ActivatedRoute
    ) {
    }

    ngOnInit() {
        this.subscription = this.route.params.subscribe((params) => {
            this.load(params['id']);
        });
        this.registerChangeInMedicos();
    }

    load(id) {
        this.medicoService.find(id)
            .subscribe((medicoResponse: HttpResponse<MedicoMySuffix>) => {
                this.medico = medicoResponse.body;
            });
    }
    previousState() {
        window.history.back();
    }

    ngOnDestroy() {
        this.subscription.unsubscribe();
        this.eventManager.destroy(this.eventSubscriber);
    }

    registerChangeInMedicos() {
        this.eventSubscriber = this.eventManager.subscribe(
            'medicoListModification',
            (response) => this.load(this.medico.id)
        );
    }
}
