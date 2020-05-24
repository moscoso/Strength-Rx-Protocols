import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { CreateWorkoutPage } from './create-workout.page';

describe('CreateWorkoutPage', () => {
    let component: CreateWorkoutPage;
    let fixture: ComponentFixture < CreateWorkoutPage > ;

    beforeEach(async (() => {
        TestBed.configureTestingModule({
            'declarations': [CreateWorkoutPage],
            'imports': [IonicModule.forRoot()]
        }).compileComponents();

        fixture = TestBed.createComponent(CreateWorkoutPage);
        component = fixture.componentInstance;
        fixture.detectChanges();
    }));

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
