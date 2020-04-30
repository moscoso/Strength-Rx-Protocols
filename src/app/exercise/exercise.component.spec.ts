import { ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { ExerciseComponent } from './exercise.component';

describe('ExerciseComponent', () => {
    let fixture: ComponentFixture < ExerciseComponent > ;
    let component: ExerciseComponent;
    let element: HTMLElement;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            'declarations': [ExerciseComponent],
            'imports': [IonicModule]
        }).compileComponents();
        fixture = TestBed.createComponent(ExerciseComponent);
        component = fixture.componentInstance;
        element = fixture.nativeElement;
        fixture.detectChanges();
    });

    afterEach(() => {
        element.remove();
    });

    it('should create', () => {
        expect(component).toBeDefined();
    });

    it('should contain PushUp in the name element', () => {
        const name: HTMLCollectionOf<Element> = element.getElementsByClassName('name');
        expect(name[0]).toBeDefined();
        expect(name[0].textContent).toContain('PushUp');
    });

    it('should contain a link to a youtube video in the video src', () => {
        const video: HTMLVideoElement = element.querySelector('video');
        expect(video).toBeDefined();
        expect(video.hasAttribute('src'));
        expect(video.getAttribute('src')).toContain('https://www.youtube.com/watch?v=IODxDxX7oi4');
    });

});
