import { Observable, OperatorFunction } from 'rxjs';
import {
    first as rxFirst,
    map as rxMap,
    startWith as rxStartWith,
    pluck as rxPluck,
    distinct as rxDistinct,
    distinctUntilChanged as rxDistinctUntilChanged
} from 'rxjs/operators';
import { nonNull, requestComplete, validString } from '../predicate/Predicates';

/**
 * This file contains commonly used observable operators and pipes.
 */

/************************************************************
 * Commonly used rxjs operators re-exported here for convenience
 * to help reduce the number of import statements
 *************************************************************/

/**
 * Returns an Observable that emits all items emitted by the source Observable that are distinct by comparison from all previous items
 */
export const distinct = rxDistinct;

/**
 * Returns an Observable that emits all items emitted by the source Observable that are distinct by comparison from the previous item.
 */
export const distinctUntilCahgned = rxDistinctUntilChanged;
/**
 * Emits only the first value (or the first value that meets some condition) emitted by the source Observable
 */
export const first = rxFirst;
/**
 * Applies a given project function to each value emitted by the source Observable, and emits the resulting values as an Observable.
 */
export const map = rxMap;
/**
 * Maps each source value (an object) to its specified nested property.
 */
export const pluck = rxPluck;
/**
 * Returns an Observable that emits the items you specify as arguments before it begins to emit items emitted by the source Observable.
 */
export const startWith = rxStartWith;

/******************************************
 * Commonly used operators populated with
 * commonly used predicate functions
 ******************************************/




/**
 * Emits only the first value emitted when the requst completes
 */
export const firstRequestComplete: OperatorFunction < any, boolean > = first(requestComplete);

/**
 * Emits only the first string emitted when the string is defined and not empty
 *
 */
export const firstValidString: OperatorFunction < string, string | boolean > = first(validString);

/**
 * Emits only the first value emitted that is defined and not null
 */
export const firstNonNullValue: OperatorFunction < any, any > = first(nonNull);

/**
 * A utility function that converts an observable to a promise that delivers a value once a request completes
 * @param observable a stream of data that may emit multiple values
 */
export function whenRequestCompletes(observable: Observable < boolean > ): Promise < boolean > {
    return observable.pipe(firstRequestComplete).toPromise();
}

/*********************************************
 * Utility functions that convert observables
 * to promises.
 *******************************************/

/**
 * A utility function that converts an observable to a promise that delivers once any value is emitted
 * @param observable a stream of data that may emit multiple values
 */
export function firstValueFrom < T >(observable: Observable < T > ): Promise < T > {
    return observable.pipe < T > (first()).toPromise();
}

/**
 * A utility function that converts an observable to a promise that delivers once a non-null value is emitted
 * @param observable a stream of data that may emit multiple values
 */
export function whenNonNull < T >(observable: Observable < T > ): Promise < T > {
    return observable.pipe < T > (firstNonNullValue).toPromise();
}
