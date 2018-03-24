import { BaseEntity } from './../../shared';

export class UsuarioMySuffix implements BaseEntity {
    constructor(
        public id?: string,
        public login?: string,
        public senha?: string,
    ) {
    }
}
