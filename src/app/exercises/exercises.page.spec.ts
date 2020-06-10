import { ComponentFixture, TestBed, tick, fakeAsync } from '@angular/core/testing';
import { IonicModule, ModalController } from '@ionic/angular';

import { ExercisesPage } from './exercises.page';
import { click } from 'testing';
import { CreateExercisePage } from './create-exercise/create-exercise.page';
import { Store } from '@ngrx/store';

describe('ExercisesPage', () => {
    let component: ExercisesPage;
    let fixture: ComponentFixture < ExercisesPage > ;
    let element: HTMLElement;


    const modalSpy = jasmine.createSpyObj('Modal', ['present']);
    const modalControllerSpy = jasmine.createSpyObj('ModalController', {'create': modalSpy});
    const storeSpy = jasmine.createSpyObj('Store', ['select', 'dispatch']);
    beforeEach(async () => {
        TestBed.configureTestingModule({
            'declarations': [ExercisesPage],
            'imports': [IonicModule],
            'providers': [
            {
                'provide': ModalController,
                'useValue': modalControllerSpy
            }, {
                'provide': Store,
                'useValue': storeSpy
            }],
        }).compileComponents();

        fixture = TestBed.createComponent(ExercisesPage);
        component = fixture.componentInstance;
        element = fixture.nativeElement;
        fixture.detectChanges();
    });

    afterEach(() => {
        element.remove();
    });

    it('has the word Exercises in the title', () => {
        const title = element.querySelector('ion-title');
        expect(title.textContent).toContain('Exercises');
    });

    it('has a #create-exercise button', () => {
        const button = element.querySelector('ion-button');
        expect(button).toBeTruthy();
        expect(button.getAttribute('id')).toEqual('create-exercise');
    });


    it('creates and presents a modal when the create-new button is clicked', async () => {
        const button: HTMLElement = element.querySelector('ion-button');
        click(button);
        await fixture.whenStable();
        expect(modalControllerSpy.create).toHaveBeenCalled();
        expect(modalSpy.present).toHaveBeenCalled();
    });

    it('the presents modal is called with id: create-exercise', async () => {
        const button: HTMLElement = element.querySelector('ion-button');
        click(button);
        await fixture.whenStable();
        expect(modalControllerSpy.create).toHaveBeenCalledWith({
            'id' : 'create-exercise',
            'component': CreateExercisePage,
        });
    });


});
