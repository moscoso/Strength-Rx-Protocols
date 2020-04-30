import { CUSTOM_ELEMENTS_SCHEMA, Component } from '@angular/core';
import { TestBed, async, ComponentFixture } from '@angular/core/testing';

import { Platform } from '@ionic/angular';
import { RouterTestingModule } from '@angular/router/testing';

import { AppComponent } from './app.component';
import { ExerciseComponent } from './exercise/exercise.component';

describe('AppComponent', () => {

    let platformReadySpy: Promise < void > , platformSpy: any;

    let fixture: ComponentFixture < AppComponent > ;
    let component: AppComponent;
    let element: HTMLElement;

    beforeEach(async () => {
        platformReadySpy = Promise.resolve();
        platformSpy = jasmine.createSpyObj('Platform', { 'ready': platformReadySpy });

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

    it('should create the app component', async () => {
        expect(component).toBeTruthy();
    });

    it('should initialize the app', async () => {
        expect(platformSpy.ready).toHaveBeenCalled();
        await platformReadySpy;
    });

    it('should have menu labels', async () => {
        fixture.detectChanges();
        const menuItems = element.querySelectorAll('ion-label');
        expect(menuItems.length).toEqual(8);
        expect(menuItems[0].textContent).toContain('Inbox');
        expect(menuItems[1].textContent).toContain('Outbox');
    });

    it('should have urls', async () => {
        fixture.detectChanges();
        const menuItems = element.querySelectorAll('ion-item');
        expect(menuItems.length).toEqual(8);
        expect(menuItems[0].getAttribute('ng-reflect-router-link')).toEqual('/folder/Inbox');
        expect(menuItems[1].getAttribute('ng-reflect-router-link')).toEqual('/folder/Outbox');
    });

});
