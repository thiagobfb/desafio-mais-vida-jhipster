/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';

import { DesafioMaisVidaTestModule } from '../../../test.module';
import { MedicoDetailComponent } from '../../../../../../main/webapp/app/entities/medico/medico-detail.component';
import { MedicoService } from '../../../../../../main/webapp/app/entities/medico/medico.service';
import { Medico } from '../../../../../../main/webapp/app/entities/medico/medico.model';

describe('Component Tests', () => {

    describe('Medico Management Detail Component', () => {
        let comp: MedicoDetailComponent;
        let fixture: ComponentFixture<MedicoDetailComponent>;
        let service: MedicoService;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [DesafioMaisVidaTestModule],
                declarations: [MedicoDetailComponent],
                providers: [
                    MedicoService
                ]
            })
            .overrideTemplate(MedicoDetailComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(MedicoDetailComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(MedicoService);
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN

                spyOn(service, 'find').and.returnValue(Observable.of(new HttpResponse({
                    body: new Medico('123')
                })));

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(service.find).toHaveBeenCalledWith('123');
                expect(comp.medico).toEqual(jasmine.objectContaining({id: '123'}));
            });
        });
    });

});
