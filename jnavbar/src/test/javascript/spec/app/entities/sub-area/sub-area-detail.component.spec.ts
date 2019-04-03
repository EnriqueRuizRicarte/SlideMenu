/* tslint:disable max-line-length */
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { SiteTestModule } from '../../../test.module';
import { SubAreaDetailComponent } from 'app/entities/sub-area/sub-area-detail.component';
import { SubArea } from 'app/shared/model/sub-area.model';

describe('Component Tests', () => {
    describe('SubArea Management Detail Component', () => {
        let comp: SubAreaDetailComponent;
        let fixture: ComponentFixture<SubAreaDetailComponent>;
        const route = ({ data: of({ subArea: new SubArea(123) }) } as any) as ActivatedRoute;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [SiteTestModule],
                declarations: [SubAreaDetailComponent],
                providers: [{ provide: ActivatedRoute, useValue: route }]
            })
                .overrideTemplate(SubAreaDetailComponent, '')
                .compileComponents();
            fixture = TestBed.createComponent(SubAreaDetailComponent);
            comp = fixture.componentInstance;
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(comp.subArea).toEqual(jasmine.objectContaining({ id: 123 }));
            });
        });
    });
});
