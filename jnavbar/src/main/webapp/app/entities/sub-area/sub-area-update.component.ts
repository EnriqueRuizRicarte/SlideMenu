import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { JhiAlertService } from 'ng-jhipster';
import { ISubArea } from 'app/shared/model/sub-area.model';
import { SubAreaService } from './sub-area.service';
import { IArea } from 'app/shared/model/area.model';
import { AreaService } from 'app/entities/area';

@Component({
    selector: 'jhi-sub-area-update',
    templateUrl: './sub-area-update.component.html'
})
export class SubAreaUpdateComponent implements OnInit {
    subArea: ISubArea;
    isSaving: boolean;

    areas: IArea[];

    constructor(
        protected jhiAlertService: JhiAlertService,
        protected subAreaService: SubAreaService,
        protected areaService: AreaService,
        protected activatedRoute: ActivatedRoute
    ) {}

    ngOnInit() {
        this.isSaving = false;
        this.activatedRoute.data.subscribe(({ subArea }) => {
            this.subArea = subArea;
        });
        this.areaService
            .query()
            .pipe(
                filter((mayBeOk: HttpResponse<IArea[]>) => mayBeOk.ok),
                map((response: HttpResponse<IArea[]>) => response.body)
            )
            .subscribe((res: IArea[]) => (this.areas = res), (res: HttpErrorResponse) => this.onError(res.message));
    }

    previousState() {
        window.history.back();
    }

    save() {
        this.isSaving = true;
        if (this.subArea.id !== undefined) {
            this.subscribeToSaveResponse(this.subAreaService.update(this.subArea));
        } else {
            this.subscribeToSaveResponse(this.subAreaService.create(this.subArea));
        }
    }

    protected subscribeToSaveResponse(result: Observable<HttpResponse<ISubArea>>) {
        result.subscribe((res: HttpResponse<ISubArea>) => this.onSaveSuccess(), (res: HttpErrorResponse) => this.onSaveError());
    }

    protected onSaveSuccess() {
        this.isSaving = false;
        this.previousState();
    }

    protected onSaveError() {
        this.isSaving = false;
    }

    protected onError(errorMessage: string) {
        this.jhiAlertService.error(errorMessage, null, null);
    }

    trackAreaById(index: number, item: IArea) {
        return item.id;
    }
}
