import { ComponentFixture, TestBed, tick, fakeAsync } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { CreateExercisePage } from './create-exercise.page';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { BrowserModule } from '@angular/platform-browser';
import { getIonInputByName } from 'testing';

describe('CreateExercisePage', () => {
    let component: CreateExercisePage;
    let fixture: ComponentFixture < CreateExercisePage > ;
    let element: HTMLElement;

    beforeEach(async () => {
        TestBed.configureTestingModule({
            'declarations': [CreateExercisePage],
            'imports': [
                FormsModule,
                IonicModule.forRoot({
                    '_testing': true,
                }),
            ],
        }).compileComponents();

        fixture = TestBed.createComponent(CreateExercisePage);
        component = fixture.componentInstance;
        element = fixture.nativeElement;
        fixture.detectChanges();
        await fixture.whenRenderingDone();
        await fixture.whenStable();
    });

    afterEach(() => {
        element.remove();
    });

    it('has the word Exercises in the title', () => {
        const title = element.querySelector('ion-title');
        expect(title.textContent).toContain('New Exercise Form');
    });

    describe('form example: Push-Up', () => {
        it('updates the name in the input for name', fakeAsync(() => {
            const input = getIonInputByName(fixture, 'name');
            input.value = 'Push-Up';
            tick(1000);
            fixture.detectChanges();
            expect(component.name).toContain('Push-Up');
        }));

        it('updates the videoURL in the input for videoURL', fakeAsync(() => {
            const input = getIonInputByName(fixture, 'videoURL');
            input.value = 'videoURL';
            tick(1000);
            fixture.detectChanges();
            expect(component.videoURL).toContain('videoURL');
        }));

        it('updates the instructions in the input for instructions', fakeAsync(() => {
            const input = getIonInputByName(fixture, 'instructions');
            input.value = 'Push your body up';
            tick(1000);
            fixture.detectChanges();
            expect(component.instructions).toContain('Push your body up');
        }));
    });


});
