import { ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { ExerciseComponent } from './exercise.component';
import { DebugElement } from '@angular/core';

describe('ExerciseComponent', () => {
    let fixture: ComponentFixture < ExerciseComponent > ;
    let component: ExerciseComponent;
    let element: HTMLElement;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            'declarations': [ExerciseComponent],
            'imports': [IonicModule],
            'providers': []
        }).compileComponents();
        fixture = TestBed.createComponent(ExerciseComponent);
        component = fixture.componentInstance;
        element = fixture.nativeElement;
        fixture.detectChanges();
    });

    afterEach(() => {
        element.remove();
    });

    describe('example: Push-up', () => {
        let debugElement: DebugElement;

        const pushUp = {
            'id': 'Push-up',
            'name': 'Push-up',
            'youtubeID': 'IODxDxX7oi4',
            'instructions': 'Push your body up off the ground',
        };

        beforeEach(() => {
            debugElement = fixture.debugElement;
            component.exercise = pushUp;
            fixture.detectChanges();
        });

        it(`has ${pushUp.name} in the name element`, () => {
            const names: HTMLCollectionOf < Element > = element.getElementsByClassName('name');
            expect(names[0].textContent).toContain(pushUp.name);
        });

        it(`displays the videoURL: ${pushUp.youtubeID}`, () => {
            const videoURLs: HTMLCollectionOf < Element > = element.getElementsByClassName('videoURL');
            expect(videoURLs[0].textContent).toContain(pushUp.youtubeID);
        });

        xit(`has an iframe embedded youtube video with video src: ${pushUp.youtubeID}`, () => {
            const iframe: HTMLIFrameElement = element.querySelector('iframe');
            expect(iframe).toBeDefined();
            expect(iframe.hasAttribute('src'));
            expect(iframe.getAttribute('src')).toContain(pushUp.youtubeID);
        });

        it('has an instructions label', () => {
            const label: HTMLIonLabelElement = element.querySelector('ion-label');
            expect(label.textContent).toContain('Instructions');
        });

        it(`has instructions text: ${pushUp.instructions}`, () => {
            const instructions = element.getElementsByClassName('instructions');
            expect(instructions[0].textContent).toContain(pushUp.instructions);
        });
    });


});
