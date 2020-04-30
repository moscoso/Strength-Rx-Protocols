import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { ExercisesPage } from './exercises.page';

describe('ExercisesPage', () => {
    let component: ExercisesPage;
    let fixture: ComponentFixture < ExercisesPage > ;
    let element: HTMLElement;

    beforeEach(async () => {
        TestBed.configureTestingModule({
            'declarations': [ExercisesPage],
            'imports': [IonicModule]
        }).compileComponents();

        fixture = TestBed.createComponent(ExercisesPage);
        component = fixture.componentInstance;
        element = fixture.nativeElement;
        fixture.detectChanges();
    });

    afterEach(() => {
        element.remove();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });

    it('should contain Exercises in the title', () => {
        const title = element.querySelector('ion-title');
        expect(title.textContent).toContain('Exercises');
    });
});
