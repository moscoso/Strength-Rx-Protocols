import { CUSTOM_ELEMENTS_SCHEMA, Component } from '@angular/core';
import { TestBed, ComponentFixture } from '@angular/core/testing';

import { Platform } from '@ionic/angular';
import { RouterTestingModule } from '@angular/router/testing';

import { AppComponent } from './app.component';
import { ExerciseComponent } from './exercise/exercise.component';

describe('AppComponent', () => {
    let fixture: ComponentFixture < AppComponent > ;
    let component: AppComponent;
    let element: HTMLElement;

    const platformReadySpy = Promise.resolve();
    const platformSpy = jasmine.createSpyObj('Platform', { 'ready': platformReadySpy });

    beforeEach(async () => {
        TestBed.configureTestingModule({
            'declarations': [AppComponent, ExerciseComponent],
            'schemas': [CUSTOM_ELEMENTS_SCHEMA],
            'providers': [
                { 'provide': Platform, 'useValue': platformSpy },
            ],
            'imports': [RouterTestingModule.withRoutes([])],
        }).compileComponents();
        fixture = TestBed.createComponent(AppComponent);
        component = fixture.componentInstance;
        element = fixture.nativeElement;
    });

    afterEach(() => {
        element.remove();
    });


    it('calls for the platform to be ready', async () => {
        expect(platformSpy.ready).toHaveBeenCalled();
        await platformReadySpy;
    });

    it('has labels for each menu item', async () => {
        fixture.detectChanges();
        const menuItems = element.querySelectorAll('ion-label');
        expect(menuItems.length).toEqual(component.items.length);
    });

    it('has first menu item with link to /exercises', async () => {
        fixture.detectChanges();
        const menuItems = element.querySelectorAll('ion-item');
        expect(menuItems[0].getAttribute('ng-reflect-router-link')).toEqual('/exercises');
    });

});
