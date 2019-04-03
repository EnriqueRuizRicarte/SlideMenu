import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { SERVER_API_URL } from 'app/app.constants';
import { createRequestOption } from 'app/shared';
import { ISubArea } from 'app/shared/model/sub-area.model';

type EntityResponseType = HttpResponse<ISubArea>;
type EntityArrayResponseType = HttpResponse<ISubArea[]>;

@Injectable({ providedIn: 'root' })
export class SubAreaService {
    public resourceUrl = SERVER_API_URL + 'api/sub-areas';

    constructor(protected http: HttpClient) {}

    create(subArea: ISubArea): Observable<EntityResponseType> {
        return this.http.post<ISubArea>(this.resourceUrl, subArea, { observe: 'response' });
    }

    update(subArea: ISubArea): Observable<EntityResponseType> {
        return this.http.put<ISubArea>(this.resourceUrl, subArea, { observe: 'response' });
    }

    find(id: number): Observable<EntityResponseType> {
        return this.http.get<ISubArea>(`${this.resourceUrl}/${id}`, { observe: 'response' });
    }

    query(req?: any): Observable<EntityArrayResponseType> {
        const options = createRequestOption(req);
        return this.http.get<ISubArea[]>(this.resourceUrl, { params: options, observe: 'response' });
    }

    delete(id: number): Observable<HttpResponse<any>> {
        return this.http.delete<any>(`${this.resourceUrl}/${id}`, { observe: 'response' });
    }
}
