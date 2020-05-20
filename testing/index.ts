import { DebugElement } from '@angular/core';
import { ComponentFixture } from '@angular/core/testing';

/** Button event objects to pass to `DebugElement.triggerEventHandler`.
 * Some elements (i.e. the RouterLink event handler) require an event object describing the button clicked.
 */
export const ButtonClickEvents = {
    'left': { 'button': 0 },
    'right': { 'button': 2 }
};

/** Simulates an element click. Defaults to mouse left-button click event. */
export function click(el: DebugElement | HTMLElement, eventObj: any = ButtonClickEvents.left): void {
    if (el instanceof HTMLElement) {
        el.click();
    } else {
        el.triggerEventHandler('click', eventObj);
    }
}

/**
 * Retrieve an ion-input element that matches a specific name attribute
 *
 * Throws an error if there are no ion-inputs with the matching name.
 * Also, throws an error if there are more than 1 ion-inputs with the matching name.
 *
 * @param fixture the component fixture that is being tested
 * @param name the name attribute of the ion-input to match
 */
export function getIonInputByName(fixture: ComponentFixture < any > , name: string): HTMLIonInputElement {
    const element: HTMLElement = fixture.nativeElement;
    const inputs: NodeListOf < HTMLIonInputElement > = element.querySelectorAll('ion-input');
    const matchingInput: HTMLIonInputElement[] = [];
    inputs.forEach(input => {
        const matchFound = input.getAttribute('name') === name;
        if (matchFound) {
            matchingInput.push(input);
        }
    });
    if (matchingInput.length < 1) {
        const errorMessage = `No ion-inputs of given name ${name} was found`;
        throw new Error(errorMessage);
    }
    if (matchingInput.length > 1) {
        const errorMessage = `${matchingInput.length} ion-inputs of given name ${name} was found`;
        throw new Error(errorMessage);
    }
    return matchingInput[0];
}
