import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { SiteSharedModule } from 'app/shared';
import {
    AreaComponent,
    AreaDetailComponent,
    AreaUpdateComponent,
    AreaDeletePopupComponent,
    AreaDeleteDialogComponent,
    areaRoute,
    areaPopupRoute
} from './';

const ENTITY_STATES = [...areaRoute, ...areaPopupRoute];

@NgModule({
    imports: [SiteSharedModule, RouterModule.forChild(ENTITY_STATES)],
    declarations: [AreaComponent, AreaDetailComponent, AreaUpdateComponent, AreaDeleteDialogComponent, AreaDeletePopupComponent],
    entryComponents: [AreaComponent, AreaUpdateComponent, AreaDeleteDialogComponent, AreaDeletePopupComponent],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class SiteAreaModule {}
