import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes } from '@angular/router';
import { JhiPaginationUtil, JhiResolvePagingParams } from 'ng-jhipster';
import { UserRouteAccessService } from 'app/core';
import { Observable, of } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { SubArea } from 'app/shared/model/sub-area.model';
import { SubAreaService } from './sub-area.service';
import { SubAreaComponent } from './sub-area.component';
import { SubAreaDetailComponent } from './sub-area-detail.component';
import { SubAreaUpdateComponent } from './sub-area-update.component';
import { SubAreaDeletePopupComponent } from './sub-area-delete-dialog.component';
import { ISubArea } from 'app/shared/model/sub-area.model';

@Injectable({ providedIn: 'root' })
export class SubAreaResolve implements Resolve<ISubArea> {
    constructor(private service: SubAreaService) {}

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<ISubArea> {
        const id = route.params['id'] ? route.params['id'] : null;
        if (id) {
            return this.service.find(id).pipe(
                filter((response: HttpResponse<SubArea>) => response.ok),
                map((subArea: HttpResponse<SubArea>) => subArea.body)
            );
        }
        return of(new SubArea());
    }
}

export const subAreaRoute: Routes = [
    {
        path: '',
        component: SubAreaComponent,
        resolve: {
            pagingParams: JhiResolvePagingParams
        },
        data: {
            authorities: ['ROLE_USER'],
            defaultSort: 'id,asc',
            pageTitle: 'SubAreas'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: ':id/view',
        component: SubAreaDetailComponent,
        resolve: {
            subArea: SubAreaResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'SubAreas'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'new',
        component: SubAreaUpdateComponent,
        resolve: {
            subArea: SubAreaResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'SubAreas'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: ':id/edit',
        component: SubAreaUpdateComponent,
        resolve: {
            subArea: SubAreaResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'SubAreas'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const subAreaPopupRoute: Routes = [
    {
        path: ':id/delete',
        component: SubAreaDeletePopupComponent,
        resolve: {
            subArea: SubAreaResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'SubAreas'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];
