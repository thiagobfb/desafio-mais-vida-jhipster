import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs/Subscription';
import { JhiEventManager } from 'ng-jhipster';

import { Medico } from './medico.model';
import { MedicoService } from './medico.service';

@Component({
    selector: 'jhi-medico-detail',
    templateUrl: './medico-detail.component.html'
})
export class MedicoDetailComponent implements OnInit, OnDestroy {

    medico: Medico;
    private subscription: Subscription;
    private eventSubscriber: Subscription;

    constructor(
        private eventManager: JhiEventManager,
        private medicoService: MedicoService,
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
            .subscribe((medicoResponse: HttpResponse<Medico>) => {
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
