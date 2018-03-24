import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { SERVER_API_URL } from '../../app.constants';

import { MedicoMySuffix } from './medico-my-suffix.model';
import { createRequestOption } from '../../shared';

export type EntityResponseType = HttpResponse<MedicoMySuffix>;

@Injectable()
export class MedicoMySuffixService {

    private resourceUrl =  SERVER_API_URL + 'api/medicos';

    constructor(private http: HttpClient) { }

    create(medico: MedicoMySuffix): Observable<EntityResponseType> {
        const copy = this.convert(medico);
        return this.http.post<MedicoMySuffix>(this.resourceUrl, copy, { observe: 'response' })
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    update(medico: MedicoMySuffix): Observable<EntityResponseType> {
        const copy = this.convert(medico);
        return this.http.put<MedicoMySuffix>(this.resourceUrl, copy, { observe: 'response' })
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    find(id: string): Observable<EntityResponseType> {
        return this.http.get<MedicoMySuffix>(`${this.resourceUrl}/${id}`, { observe: 'response'})
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    query(req?: any): Observable<HttpResponse<MedicoMySuffix[]>> {
        const options = createRequestOption(req);
        return this.http.get<MedicoMySuffix[]>(this.resourceUrl, { params: options, observe: 'response' })
            .map((res: HttpResponse<MedicoMySuffix[]>) => this.convertArrayResponse(res));
    }

    delete(id: string): Observable<HttpResponse<any>> {
        return this.http.delete<any>(`${this.resourceUrl}/${id}`, { observe: 'response'});
    }

    private convertResponse(res: EntityResponseType): EntityResponseType {
        const body: MedicoMySuffix = this.convertItemFromServer(res.body);
        return res.clone({body});
    }

    private convertArrayResponse(res: HttpResponse<MedicoMySuffix[]>): HttpResponse<MedicoMySuffix[]> {
        const jsonResponse: MedicoMySuffix[] = res.body;
        const body: MedicoMySuffix[] = [];
        for (let i = 0; i < jsonResponse.length; i++) {
            body.push(this.convertItemFromServer(jsonResponse[i]));
        }
        return res.clone({body});
    }

    /**
     * Convert a returned JSON object to MedicoMySuffix.
     */
    private convertItemFromServer(medico: MedicoMySuffix): MedicoMySuffix {
        const copy: MedicoMySuffix = Object.assign({}, medico);
        return copy;
    }

    /**
     * Convert a MedicoMySuffix to a JSON which can be sent to the server.
     */
    private convert(medico: MedicoMySuffix): MedicoMySuffix {
        const copy: MedicoMySuffix = Object.assign({}, medico);
        return copy;
    }
}
