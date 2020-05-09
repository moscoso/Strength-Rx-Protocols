import { DebugElement } from '@angular/core';

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
