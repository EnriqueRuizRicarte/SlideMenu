import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { ISubArea } from 'app/shared/model/sub-area.model';

@Component({
    selector: 'jhi-sub-area-detail',
    templateUrl: './sub-area-detail.component.html'
})
export class SubAreaDetailComponent implements OnInit {
    subArea: ISubArea;

    constructor(protected activatedRoute: ActivatedRoute) {}

    ngOnInit() {
        this.activatedRoute.data.subscribe(({ subArea }) => {
            this.subArea = subArea;
        });
    }

    previousState() {
        window.history.back();
    }
}
