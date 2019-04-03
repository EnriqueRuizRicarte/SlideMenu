import { NgModule } from '@angular/core';

import { SiteSharedLibsModule, JhiAlertComponent, JhiAlertErrorComponent } from './';

@NgModule({
    imports: [SiteSharedLibsModule],
    declarations: [JhiAlertComponent, JhiAlertErrorComponent],
    exports: [SiteSharedLibsModule, JhiAlertComponent, JhiAlertErrorComponent]
})
export class SiteSharedCommonModule {}
