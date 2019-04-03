import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { NgbActiveModal, NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { IArea } from 'app/shared/model/area.model';
import { AreaService } from './area.service';

@Component({
    selector: 'jhi-area-delete-dialog',
    templateUrl: './area-delete-dialog.component.html'
})
export class AreaDeleteDialogComponent {
    area: IArea;

    constructor(protected areaService: AreaService, public activeModal: NgbActiveModal, protected eventManager: JhiEventManager) {}

    clear() {
        this.activeModal.dismiss('cancel');
    }

    confirmDelete(id: number) {
        this.areaService.delete(id).subscribe(response => {
            this.eventManager.broadcast({
                name: 'areaListModification',
                content: 'Deleted an area'
            });
            this.activeModal.dismiss(true);
        });
    }
}

@Component({
    selector: 'jhi-area-delete-popup',
    template: ''
})
export class AreaDeletePopupComponent implements OnInit, OnDestroy {
    protected ngbModalRef: NgbModalRef;

    constructor(protected activatedRoute: ActivatedRoute, protected router: Router, protected modalService: NgbModal) {}

    ngOnInit() {
        this.activatedRoute.data.subscribe(({ area }) => {
            setTimeout(() => {
                this.ngbModalRef = this.modalService.open(AreaDeleteDialogComponent as Component, { size: 'lg', backdrop: 'static' });
                this.ngbModalRef.componentInstance.area = area;
                this.ngbModalRef.result.then(
                    result => {
                        this.router.navigate(['/area', { outlets: { popup: null } }]);
                        this.ngbModalRef = null;
                    },
                    reason => {
                        this.router.navigate(['/area', { outlets: { popup: null } }]);
                        this.ngbModalRef = null;
                    }
                );
            }, 0);
        });
    }

    ngOnDestroy() {
        this.ngbModalRef = null;
    }
}
