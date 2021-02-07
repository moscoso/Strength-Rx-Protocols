import { Observable, OperatorFunction } from 'rxjs';
import { first } from 'rxjs/operators';
import { nonNull, requestComplete, validString } from '../predicate/Predicates';

/**
 * This file contains commonly used observable operators and pipes
 */

/**
 * Emits only the first value emitted when the requst completes
 */
export const firstRequestComplete: OperatorFunction<any, boolean> = first(requestComplete);

/**
 * Emits only the first string emitted when the string is defined and not empty
 *
 */
export const firstValidString: OperatorFunction<string, string | boolean> = first(validString);

/**
 * Emits only the first value emitted that is defined and not null
 */
export const firstNonNull: OperatorFunction<any, any> = first(nonNull);

/**
 * Converts an observable to a promise that delivers a value once a request completes
 * @param observable a stream of data that may emit multiple values
 */
export function whenRequestCompletes(observable: Observable<boolean> ): Promise<boolean> {
    return observable.pipe(firstRequestComplete).toPromise();
}

/**
 * Converts an observable to a promise that delivers once a non null value is emitted
 * @param observable a stream of data that may emit multiple values
 */
export function whenNonNull<T>(observable: Observable<T> ): Promise<T> {
    return observable.pipe<T>(firstNonNull).toPromise();
}
