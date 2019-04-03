/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { Observable, of } from 'rxjs';

import { SiteTestModule } from '../../../test.module';
import { SubAreaUpdateComponent } from 'app/entities/sub-area/sub-area-update.component';
import { SubAreaService } from 'app/entities/sub-area/sub-area.service';
import { SubArea } from 'app/shared/model/sub-area.model';

describe('Component Tests', () => {
    describe('SubArea Management Update Component', () => {
        let comp: SubAreaUpdateComponent;
        let fixture: ComponentFixture<SubAreaUpdateComponent>;
        let service: SubAreaService;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [SiteTestModule],
                declarations: [SubAreaUpdateComponent]
            })
                .overrideTemplate(SubAreaUpdateComponent, '')
                .compileComponents();

            fixture = TestBed.createComponent(SubAreaUpdateComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(SubAreaService);
        });

        describe('save', () => {
            it('Should call update service on save for existing entity', fakeAsync(() => {
                // GIVEN
                const entity = new SubArea(123);
                spyOn(service, 'update').and.returnValue(of(new HttpResponse({ body: entity })));
                comp.subArea = entity;
                // WHEN
                comp.save();
                tick(); // simulate async

                // THEN
                expect(service.update).toHaveBeenCalledWith(entity);
                expect(comp.isSaving).toEqual(false);
            }));

            it('Should call create service on save for new entity', fakeAsync(() => {
                // GIVEN
                const entity = new SubArea();
                spyOn(service, 'create').and.returnValue(of(new HttpResponse({ body: entity })));
                comp.subArea = entity;
                // WHEN
                comp.save();
                tick(); // simulate async

                // THEN
                expect(service.create).toHaveBeenCalledWith(entity);
                expect(comp.isSaving).toEqual(false);
            }));
        });
    });
});
