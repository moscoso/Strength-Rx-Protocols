import { ComponentFixture, TestBed, tick, fakeAsync } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { CreateExercisePage } from './create-exercise.page';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MaterialsModule } from '../materials.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

describe('CreateExercisePage', () => {
    let component: CreateExercisePage;
    let fixture: ComponentFixture < CreateExercisePage > ;
    let element: HTMLElement;

    beforeEach(async () => {
        TestBed.configureTestingModule({
            'declarations': [CreateExercisePage],
            'imports': [
                FormsModule,
                ReactiveFormsModule,
                BrowserAnimationsModule,
                MaterialsModule,
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

        it('form invalid when empty', () => {
            expect(component.form.valid).toBeFalsy();
        });

        it('inputing any string for name makes the form control valid', async () => {
            component.form.get('name').setValue('Push-Up');
            expect(component.form.get('name').valid).toBe(true);
        });

        it('inputing any string for videoURL makes the form control valid', async () => {
            component.form.get('videoURL').setValue('Push-Up');
            expect(component.form.get('videoURL').valid).toBe(true);
        });

        it('inputing any text for instructions makes the form control valid', async () => {
            component.form.get('name').setValue('Push-Up');
            expect(component.form.get('name').valid).toBe(true);
        });
    });


});
