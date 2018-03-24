/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';

import { DesafioMaisVidaTestModule } from '../../../test.module';
import { MedicoMySuffixDetailComponent } from '../../../../../../main/webapp/app/entities/medico-my-suffix/medico-my-suffix-detail.component';
import { MedicoMySuffixService } from '../../../../../../main/webapp/app/entities/medico-my-suffix/medico-my-suffix.service';
import { MedicoMySuffix } from '../../../../../../main/webapp/app/entities/medico-my-suffix/medico-my-suffix.model';

describe('Component Tests', () => {

    describe('MedicoMySuffix Management Detail Component', () => {
        let comp: MedicoMySuffixDetailComponent;
        let fixture: ComponentFixture<MedicoMySuffixDetailComponent>;
        let service: MedicoMySuffixService;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [DesafioMaisVidaTestModule],
                declarations: [MedicoMySuffixDetailComponent],
                providers: [
                    MedicoMySuffixService
                ]
            })
            .overrideTemplate(MedicoMySuffixDetailComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(MedicoMySuffixDetailComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(MedicoMySuffixService);
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN

                spyOn(service, 'find').and.returnValue(Observable.of(new HttpResponse({
                    body: new MedicoMySuffix('123')
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
