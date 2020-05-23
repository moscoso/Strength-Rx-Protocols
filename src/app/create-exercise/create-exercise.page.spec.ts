import { ComponentFixture, TestBed, tick, fakeAsync } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { CreateExercisePage } from './create-exercise.page';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MaterialsModule } from '../materials.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { Store } from '@ngrx/store';

describe('CreateExercisePage', () => {
    let component: CreateExercisePage;
    let fixture: ComponentFixture < CreateExercisePage > ;
    let element: HTMLElement;


    const storeSpy = jasmine.createSpyObj('Store', ['select', 'dispatch']);

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
            'providers': [
            {
                'provide': Store,
                'useValue': storeSpy
            }]
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

        it('inputing a non-url string for youtubeURL makes the form invalid', async () => {
            component.form.get('youtubeURL').setValue('abc');
            expect(component.form.get('youtubeURL').valid).toBe(false);
        });

        it('inputing any text for instructions makes the form control valid', async () => {
            component.form.get('name').setValue('Push-Up');
            expect(component.form.get('name').valid).toBe(true);
        });
    });

    describe('scrape ID from youtube link', () => {
        it('should scrape from "https://www.youtube.com/watch?v=sN8AGGLzuUw"', () => {
            const youtubeID = component.scrapeIDfromYoutubeURL(
                'https://www.youtube.com/watch?v=sN8AGGLzuUw');
            expect(youtubeID).toEqual('sN8AGGLzuUw');
        });

        it('should scrape from "https://www.youtu.be/sN8AGGLzuUw"', () => {
            const youtubeID = component.scrapeIDfromYoutubeURL(
                'https://www.youtube.com/watch?v=sN8AGGLzuUw');
            expect(youtubeID).toEqual('sN8AGGLzuUw');
        });

        it('should throw an error for in an invalid youtube link', () => {
            expect(() => component.scrapeIDfromYoutubeURL('https://www.google.com')).toThrow();
        });
    });


});
