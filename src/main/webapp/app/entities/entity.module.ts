import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';

import { DesafioMaisVidaMedicoMySuffixModule } from './medico-my-suffix/medico-my-suffix.module';
import { DesafioMaisVidaUsuarioMySuffixModule } from './usuario-my-suffix/usuario-my-suffix.module';
/* jhipster-needle-add-entity-module-import - JHipster will add entity modules imports here */

@NgModule({
    imports: [
        DesafioMaisVidaMedicoMySuffixModule,
        DesafioMaisVidaUsuarioMySuffixModule,
        /* jhipster-needle-add-entity-module - JHipster will add entity modules here */
    ],
    declarations: [],
    entryComponents: [],
    providers: [],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class DesafioMaisVidaEntityModule {}
