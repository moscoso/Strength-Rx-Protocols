import { CUSTOM_ELEMENTS_SCHEMA, Component, DebugElement } from '@angular/core';
import { TestBed, ComponentFixture } from '@angular/core/testing';

import { Platform } from '@ionic/angular';
import { RouterTestingModule } from '@angular/router/testing';

import { AppComponent } from './app.component';
import { ExerciseComponent } from './exercise/exercise.component';
import { Store } from '@ngrx/store';
import { of } from 'rxjs';
import { By } from '@angular/platform-browser';

describe('AppComponent', () => {
    let fixture: ComponentFixture < AppComponent > ;
    let component: AppComponent;
    let element: HTMLElement;

    const voidPromise = Promise.resolve();
    const platformSpy = jasmine.createSpyObj('Platform', { 'ready': voidPromise });

    const routeObservable = of ({
        'state': { 'router': { 'state': '/exercises' } }
    });
    const storeSpy = jasmine.createSpyObj('Store', { 'select': routeObservable });

    beforeEach(async () => {
        TestBed.configureTestingModule({
            'declarations': [AppComponent, ExerciseComponent],
            'schemas': [CUSTOM_ELEMENTS_SCHEMA],
            'providers': [
                { 'provide': Platform, 'useValue': platformSpy },
                { 'provide': Store, 'useValue': storeSpy },
            ],
            'imports': [RouterTestingModule.withRoutes([])],
        }).compileComponents();
        fixture = TestBed.createComponent(AppComponent);
        component = fixture.componentInstance;
        element = fixture.nativeElement;
        fixture.detectChanges();
    });

    afterEach(() => {
        element.remove();
    });


    it('calls for the platform to be ready', async () => {
        expect(platformSpy.ready).toHaveBeenCalled();
        await voidPromise;
    });

    it('calls select on the store onNgInit', async () => {
        expect(storeSpy.select).toHaveBeenCalled();
    });



    it('has labels for each menu item', async () => {
        const menuItems = element.querySelectorAll('ion-label');
        expect(menuItems.length).toEqual(component.items.length);
    });

    it('has first menu item with link to /exercises', async () => {
        fixture.detectChanges();
        const menuItems = element.querySelectorAll('ion-item');
        expect(menuItems[0].getAttribute('ng-reflect-router-link')).toEqual('/exercises');
    });

    it('when the current route url is /exercises the first menu item has a class of ".selected"', () => {
        component.selectedRoute = '/exercises';
        fixture.detectChanges();
        const menuItems = element.querySelectorAll('ion-item');
        expect(menuItems[0].getAttribute('class')).toContain('selected');
    });

});
