/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async, inject, fakeAsync, tick } from '@angular/core/testing';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Observable } from 'rxjs/Observable';
import { JhiEventManager } from 'ng-jhipster';

import { DesafioMaisVidaTestModule } from '../../../test.module';
import { MedicoMySuffixDeleteDialogComponent } from '../../../../../../main/webapp/app/entities/medico-my-suffix/medico-my-suffix-delete-dialog.component';
import { MedicoMySuffixService } from '../../../../../../main/webapp/app/entities/medico-my-suffix/medico-my-suffix.service';

describe('Component Tests', () => {

    describe('MedicoMySuffix Management Delete Component', () => {
        let comp: MedicoMySuffixDeleteDialogComponent;
        let fixture: ComponentFixture<MedicoMySuffixDeleteDialogComponent>;
        let service: MedicoMySuffixService;
        let mockEventManager: any;
        let mockActiveModal: any;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [DesafioMaisVidaTestModule],
                declarations: [MedicoMySuffixDeleteDialogComponent],
                providers: [
                    MedicoMySuffixService
                ]
            })
            .overrideTemplate(MedicoMySuffixDeleteDialogComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(MedicoMySuffixDeleteDialogComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(MedicoMySuffixService);
            mockEventManager = fixture.debugElement.injector.get(JhiEventManager);
            mockActiveModal = fixture.debugElement.injector.get(NgbActiveModal);
        });

        describe('confirmDelete', () => {
            it('Should call delete service on confirmDelete',
                inject([],
                    fakeAsync(() => {
                        // GIVEN
                        spyOn(service, 'delete').and.returnValue(Observable.of({}));

                        // WHEN
                        comp.confirmDelete('123');
                        tick();

                        // THEN
                        expect(service.delete).toHaveBeenCalledWith('123');
                        expect(mockActiveModal.dismissSpy).toHaveBeenCalled();
                        expect(mockEventManager.broadcastSpy).toHaveBeenCalled();
                    })
                )
            );
        });
    });

});
