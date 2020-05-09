import { async, ComponentFixture, TestBed, fakeAsync } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { CreateExercisePage } from './create-exercise.page';
import { FormsModule } from '@angular/forms';

describe('CreateExercisePage', () => {
    let component: CreateExercisePage;
    let fixture: ComponentFixture < CreateExercisePage > ;
    let element: HTMLElement;

    beforeEach(async (() => {
        TestBed.configureTestingModule({
            'declarations': [CreateExercisePage],
            'imports': [
                IonicModule,
                FormsModule,
            ],
        }).compileComponents();

        fixture = TestBed.createComponent(CreateExercisePage);
        component = fixture.componentInstance;
        element = fixture.nativeElement;
        fixture.detectChanges();
    }));

    afterEach(() => {
        element.remove();
    });

    it('has the word Exercises in the title', () => {
        const title = element.querySelector('ion-title');
        expect(title.textContent).toContain('New Exercise Form');
    });

    describe('form example: Push-Up', () => {
        it('updates the name in the input for name', async () => {
            const input: HTMLInputElement = element.querySelectorAll('input')[0];
            input.value = 'Push-Up';
            input.dispatchEvent(new Event('input'));
            fixture.detectChanges();
            await fixture.whenStable();
            expect(component.name).toContain('Push-Up');
        });

        it('updates the videoURL in the input for videoURL', async () => {
            const input: HTMLInputElement = element.querySelectorAll('input')[1];
            input.value = 'videoURL';
            input.dispatchEvent(new Event('input'));
            fixture.detectChanges();
            await fixture.whenStable();
            expect(component.videoURL).toContain('videoURL');
        });

        it('updates the instructions in the input for instructions', async () => {
            const input: HTMLInputElement = element.querySelectorAll('input')[2];
            input.value = 'Push your body up';
            input.dispatchEvent(new Event('input'));
            fixture.detectChanges();
            await fixture.whenStable();
            expect(component.instructions).toContain('Push your body up');
          });
    });


});
