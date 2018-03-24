/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { Observable } from 'rxjs/Observable';
import { HttpHeaders, HttpResponse } from '@angular/common/http';

import { DesafioMaisVidaTestModule } from '../../../test.module';
import { MedicoMySuffixComponent } from '../../../../../../main/webapp/app/entities/medico-my-suffix/medico-my-suffix.component';
import { MedicoMySuffixService } from '../../../../../../main/webapp/app/entities/medico-my-suffix/medico-my-suffix.service';
import { MedicoMySuffix } from '../../../../../../main/webapp/app/entities/medico-my-suffix/medico-my-suffix.model';

describe('Component Tests', () => {

    describe('MedicoMySuffix Management Component', () => {
        let comp: MedicoMySuffixComponent;
        let fixture: ComponentFixture<MedicoMySuffixComponent>;
        let service: MedicoMySuffixService;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [DesafioMaisVidaTestModule],
                declarations: [MedicoMySuffixComponent],
                providers: [
                    MedicoMySuffixService
                ]
            })
            .overrideTemplate(MedicoMySuffixComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(MedicoMySuffixComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(MedicoMySuffixService);
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN
                const headers = new HttpHeaders().append('link', 'link;link');
                spyOn(service, 'query').and.returnValue(Observable.of(new HttpResponse({
                    body: [new MedicoMySuffix('123')],
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
