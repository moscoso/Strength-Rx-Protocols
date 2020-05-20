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
 * Retrieve an input element that matches a specific name attribute
 *
 * Throws an error if there are no inputs with the matching name.
 * Also, throws an error if there are more than 1 inputs with the matching name.
 *
 * @param fixture the component fixture that is being tested
 * @param name the name attribute of the input to match
 */
export function getInputByName(fixture: ComponentFixture < any > , name: string): HTMLInputElement {
    const element: HTMLElement = fixture.nativeElement;
    const inputs: NodeListOf < HTMLInputElement > = element.querySelectorAll('input');
    const matchingInput: HTMLInputElement[] = [];
    inputs.forEach(input => {
        const matchFound = input.getAttribute('name') === name;
        if (matchFound) {
            matchingInput.push(input);
        }
    });
    if (matchingInput.length < 1) {
        const errorMessage = `No inputs of given name ${name} was found`;
        throw new Error(errorMessage);
    }
    if (matchingInput.length > 1) {
        const errorMessage = `${matchingInput.length} inputs of given name ${name} was found`;
        throw new Error(errorMessage);
    }
    return matchingInput[0];
}

/**
 * Retrieve a textarea element that matches a specific name attribute
 *
 * Throws an error if there are no textareas with the matching name.
 * Also, throws an error if there are more than 1 textareas with the matching name.
 *
 * @param fixture the component fixture that is being tested
 * @param name the name attribute of the textareas to match
 */
export function getTextareaByName(fixture: ComponentFixture < any > , name: string): HTMLTextAreaElement {
    const element: HTMLElement = fixture.nativeElement;
    const inputs: NodeListOf < HTMLTextAreaElement > = element.querySelectorAll('textarea');
    const matchingInput: HTMLTextAreaElement[] = [];
    inputs.forEach(input => {
        const matchFound = input.getAttribute('name') === name;
        if (matchFound) {
            matchingInput.push(input);
        }
    });
    if (matchingInput.length < 1) {
        const errorMessage = `No inputs of given name ${name} was found`;
        throw new Error(errorMessage);
    }
    if (matchingInput.length > 1) {
        const errorMessage = `${matchingInput.length} inputs of given name ${name} was found`;
        throw new Error(errorMessage);
    }
    return matchingInput[0];
}
