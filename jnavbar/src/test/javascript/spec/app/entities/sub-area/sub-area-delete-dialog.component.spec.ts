/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, inject, fakeAsync, tick } from '@angular/core/testing';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Observable, of } from 'rxjs';
import { JhiEventManager } from 'ng-jhipster';

import { SiteTestModule } from '../../../test.module';
import { SubAreaDeleteDialogComponent } from 'app/entities/sub-area/sub-area-delete-dialog.component';
import { SubAreaService } from 'app/entities/sub-area/sub-area.service';

describe('Component Tests', () => {
    describe('SubArea Management Delete Component', () => {
        let comp: SubAreaDeleteDialogComponent;
        let fixture: ComponentFixture<SubAreaDeleteDialogComponent>;
        let service: SubAreaService;
        let mockEventManager: any;
        let mockActiveModal: any;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [SiteTestModule],
                declarations: [SubAreaDeleteDialogComponent]
            })
                .overrideTemplate(SubAreaDeleteDialogComponent, '')
                .compileComponents();
            fixture = TestBed.createComponent(SubAreaDeleteDialogComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(SubAreaService);
            mockEventManager = fixture.debugElement.injector.get(JhiEventManager);
            mockActiveModal = fixture.debugElement.injector.get(NgbActiveModal);
        });

        describe('confirmDelete', () => {
            it('Should call delete service on confirmDelete', inject(
                [],
                fakeAsync(() => {
                    // GIVEN
                    spyOn(service, 'delete').and.returnValue(of({}));

                    // WHEN
                    comp.confirmDelete(123);
                    tick();

                    // THEN
                    expect(service.delete).toHaveBeenCalledWith(123);
                    expect(mockActiveModal.dismissSpy).toHaveBeenCalled();
                    expect(mockEventManager.broadcastSpy).toHaveBeenCalled();
                })
            ));
        });
    });
});
