import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { IArea } from 'app/shared/model/area.model';
import { AreaService } from './area.service';

@Component({
    selector: 'jhi-area-update',
    templateUrl: './area-update.component.html'
})
export class AreaUpdateComponent implements OnInit {
    area: IArea;
    isSaving: boolean;

    constructor(protected areaService: AreaService, protected activatedRoute: ActivatedRoute) {}

    ngOnInit() {
        this.isSaving = false;
        this.activatedRoute.data.subscribe(({ area }) => {
            this.area = area;
        });
    }

    previousState() {
        window.history.back();
    }

    save() {
        this.isSaving = true;
        if (this.area.id !== undefined) {
            this.subscribeToSaveResponse(this.areaService.update(this.area));
        } else {
            this.subscribeToSaveResponse(this.areaService.create(this.area));
        }
    }

    protected subscribeToSaveResponse(result: Observable<HttpResponse<IArea>>) {
        result.subscribe((res: HttpResponse<IArea>) => this.onSaveSuccess(), (res: HttpErrorResponse) => this.onSaveError());
    }

    protected onSaveSuccess() {
        this.isSaving = false;
        this.previousState();
    }

    protected onSaveError() {
        this.isSaving = false;
    }
}
