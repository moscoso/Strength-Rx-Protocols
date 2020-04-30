import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { ExerciseComponent } from './exercise.component';

describe('ExerciseComponent', () => {
    let fixture: ComponentFixture < ExerciseComponent > ;
    let component: ExerciseComponent;
    let element: HTMLElement;

    beforeEach(async (() => {
        TestBed.configureTestingModule({
            declarations: [ExerciseComponent],
            imports: [IonicModule]
        }).compileComponents();
        fixture = TestBed.createComponent(ExerciseComponent);
        component = fixture.componentInstance;
        element = fixture.nativeElement;
    }));

    it('should create', () => {
        expect(component).toBeDefined();
    });

    it('should have urls', () => {
        const paragraph: NodeListOf < HTMLParagraphElement > = element.querySelectorAll('p');
        expect(paragraph[0].textContent).toContain('wow');
    });

});
