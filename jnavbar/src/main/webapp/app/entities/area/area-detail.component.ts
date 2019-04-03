import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { IArea } from 'app/shared/model/area.model';

@Component({
    selector: 'jhi-area-detail',
    templateUrl: './area-detail.component.html'
})
export class AreaDetailComponent implements OnInit {
    area: IArea;

    constructor(protected activatedRoute: ActivatedRoute) {}

    ngOnInit() {
        this.activatedRoute.data.subscribe(({ area }) => {
            this.area = area;
        });
    }

    previousState() {
        window.history.back();
    }
}
