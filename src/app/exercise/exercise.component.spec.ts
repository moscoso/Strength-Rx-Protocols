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
            'name': 'Push-up',
            'videoURL': 'https://www.youtube.com/embed/IODxDxX7oi4',
            'instructions': 'Push your body up off the ground',
        };

        beforeEach(() => {
            debugElement = fixture.debugElement;
            component.name = pushUp.name;
            component.instructions = pushUp.instructions;
            component.videoURL = pushUp.videoURL;
            fixture.detectChanges();
        });

        it(`has ${pushUp.name} in the name element`, () => {
            const names: HTMLCollectionOf < Element > = element.getElementsByClassName('name');
            expect(names[0].textContent).toContain(pushUp.name);
        });

        it(`displays the videoURL: ${pushUp.videoURL}`, () => {
            const videoURLs: HTMLCollectionOf < Element > = element.getElementsByClassName('videoURL');
            expect(videoURLs[0].textContent).toContain(pushUp.videoURL);
        });

        xit(`has an iframe embedded youtube video with video src: ${pushUp.videoURL}`, () => {
            const iframe: HTMLIFrameElement = element.querySelector('iframe');
            expect(iframe).toBeDefined();
            expect(iframe.hasAttribute('src'));
            expect(iframe.getAttribute('src')).toContain(pushUp.videoURL);
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
