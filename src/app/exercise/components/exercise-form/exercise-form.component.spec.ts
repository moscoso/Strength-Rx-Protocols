import { ComponentFixture, TestBed, tick, fakeAsync } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MaterialsModule } from '../../../materials.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { Store } from '@ngrx/store';
import { AngularFirestore } from '@angular/fire/firestore';
import { ExerciseFormComponent } from './exercise-form.component';

describe('ExerciseFormComponent', () => {
    let component: ExerciseFormComponent;
    let fixture: ComponentFixture < ExerciseFormComponent > ;
    let element: HTMLElement;


    const storeSpy = jasmine.createSpyObj('Store', ['select', 'dispatch']);
    const firestoreSpy = jasmine.createSpyObj('AngualarFirestore', ['doc']);
    beforeEach(async () => {
        TestBed.configureTestingModule({
            'declarations': [ExerciseFormComponent],
            'imports': [
                FormsModule,
                ReactiveFormsModule,
                BrowserAnimationsModule,
                MaterialsModule,
                IonicModule.forRoot({
                    '_testing': true,
                }),
            ],
            'providers': [{
                'provide': Store,
                'useValue': storeSpy
            }, {
                'provide': AngularFirestore,
                'useValue': firestoreSpy,
            }]
        }).compileComponents();

        fixture = TestBed.createComponent(ExerciseFormComponent);
        component = fixture.componentInstance;
        element = fixture.nativeElement;
        fixture.detectChanges();
        await fixture.whenRenderingDone();
        await fixture.whenStable();
    });

    afterEach(() => {
        element.remove();
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
