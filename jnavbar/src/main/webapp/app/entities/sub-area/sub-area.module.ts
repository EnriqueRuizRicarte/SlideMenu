import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { SiteSharedModule } from 'app/shared';
import {
    SubAreaComponent,
    SubAreaDetailComponent,
    SubAreaUpdateComponent,
    SubAreaDeletePopupComponent,
    SubAreaDeleteDialogComponent,
    subAreaRoute,
    subAreaPopupRoute
} from './';

const ENTITY_STATES = [...subAreaRoute, ...subAreaPopupRoute];

@NgModule({
    imports: [SiteSharedModule, RouterModule.forChild(ENTITY_STATES)],
    declarations: [
        SubAreaComponent,
        SubAreaDetailComponent,
        SubAreaUpdateComponent,
        SubAreaDeleteDialogComponent,
        SubAreaDeletePopupComponent
    ],
    entryComponents: [SubAreaComponent, SubAreaUpdateComponent, SubAreaDeleteDialogComponent, SubAreaDeletePopupComponent],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class SiteSubAreaModule {}
