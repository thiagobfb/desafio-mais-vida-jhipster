/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { Observable } from 'rxjs/Observable';
import { HttpHeaders, HttpResponse } from '@angular/common/http';

import { DesafioMaisVidaTestModule } from '../../../test.module';
import { MedicoComponent } from '../../../../../../main/webapp/app/entities/medico/medico.component';
import { MedicoService } from '../../../../../../main/webapp/app/entities/medico/medico.service';
import { Medico } from '../../../../../../main/webapp/app/entities/medico/medico.model';

describe('Component Tests', () => {

    describe('Medico Management Component', () => {
        let comp: MedicoComponent;
        let fixture: ComponentFixture<MedicoComponent>;
        let service: MedicoService;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [DesafioMaisVidaTestModule],
                declarations: [MedicoComponent],
                providers: [
                    MedicoService
                ]
            })
            .overrideTemplate(MedicoComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(MedicoComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(MedicoService);
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN
                const headers = new HttpHeaders().append('link', 'link;link');
                spyOn(service, 'query').and.returnValue(Observable.of(new HttpResponse({
                    body: [new Medico('123')],
                    headers
                })));

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(service.query).toHaveBeenCalled();
                expect(comp.medicos[0]).toEqual(jasmine.objectContaining({id: '123'}));
            });
        });
    });

});
