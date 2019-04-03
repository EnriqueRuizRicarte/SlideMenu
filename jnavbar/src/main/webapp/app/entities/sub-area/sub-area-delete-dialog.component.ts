import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { NgbActiveModal, NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { ISubArea } from 'app/shared/model/sub-area.model';
import { SubAreaService } from './sub-area.service';

@Component({
    selector: 'jhi-sub-area-delete-dialog',
    templateUrl: './sub-area-delete-dialog.component.html'
})
export class SubAreaDeleteDialogComponent {
    subArea: ISubArea;

    constructor(protected subAreaService: SubAreaService, public activeModal: NgbActiveModal, protected eventManager: JhiEventManager) {}

    clear() {
        this.activeModal.dismiss('cancel');
    }

    confirmDelete(id: number) {
        this.subAreaService.delete(id).subscribe(response => {
            this.eventManager.broadcast({
                name: 'subAreaListModification',
                content: 'Deleted an subArea'
            });
            this.activeModal.dismiss(true);
        });
    }
}

@Component({
    selector: 'jhi-sub-area-delete-popup',
    template: ''
})
export class SubAreaDeletePopupComponent implements OnInit, OnDestroy {
    protected ngbModalRef: NgbModalRef;

    constructor(protected activatedRoute: ActivatedRoute, protected router: Router, protected modalService: NgbModal) {}

    ngOnInit() {
        this.activatedRoute.data.subscribe(({ subArea }) => {
            setTimeout(() => {
                this.ngbModalRef = this.modalService.open(SubAreaDeleteDialogComponent as Component, { size: 'lg', backdrop: 'static' });
                this.ngbModalRef.componentInstance.subArea = subArea;
                this.ngbModalRef.result.then(
                    result => {
                        this.router.navigate(['/sub-area', { outlets: { popup: null } }]);
                        this.ngbModalRef = null;
                    },
                    reason => {
                        this.router.navigate(['/sub-area', { outlets: { popup: null } }]);
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
