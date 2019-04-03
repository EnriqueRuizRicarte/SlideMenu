import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { SERVER_API_URL } from 'app/app.constants';
import { createRequestOption } from 'app/shared';
import { IArea } from 'app/shared/model/area.model';

type EntityResponseType = HttpResponse<IArea>;
type EntityArrayResponseType = HttpResponse<IArea[]>;

@Injectable({ providedIn: 'root' })
export class AreaService {
    public resourceUrl = SERVER_API_URL + 'api/areas';

    constructor(protected http: HttpClient) {}

    create(area: IArea): Observable<EntityResponseType> {
        return this.http.post<IArea>(this.resourceUrl, area, { observe: 'response' });
    }

    update(area: IArea): Observable<EntityResponseType> {
        return this.http.put<IArea>(this.resourceUrl, area, { observe: 'response' });
    }

    find(id: number): Observable<EntityResponseType> {
        return this.http.get<IArea>(`${this.resourceUrl}/${id}`, { observe: 'response' });
    }

    query(req?: any): Observable<EntityArrayResponseType> {
        const options = createRequestOption(req);
        return this.http.get<IArea[]>(this.resourceUrl, { params: options, observe: 'response' });
    }

    delete(id: number): Observable<HttpResponse<any>> {
        return this.http.delete<any>(`${this.resourceUrl}/${id}`, { observe: 'response' });
    }
}
