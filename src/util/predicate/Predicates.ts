/*
 * This file contains commonly used predicate functions
 */
/**
 * This predicate returns true if the object is defined and not null
 */
export function nonNull(object: any): boolean{
    return object != null;
}

/**
 * This predicate returns true if the string is defined and not an empty string
 */
export function validString(s: string): boolean{
    return s != null && s !== '';
}

/**
 * A request is complete when it is no longer in progress.
 *
 * To clarify,
 * When a request begins, requestInProgress flag is set to true.
 * Once the request is complete, the requestInProgress flag is set to false.
 *
 * @param requestInProgress the flag indicating whether the requestIsInProgress
 */
export function requestComplete(requestInProgress: boolean): boolean {
    return !requestInProgress;
}




