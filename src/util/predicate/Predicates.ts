/**
 * This file contains common predicate functions used often by observable operators.
 */

/**
 * This predicate returns true if the object is defined and not null
 */
export function nonNull(object){
    return object != null;
}

/**
 * This predicate returns true if the string is defined and not an empty string
 */
export function validString(string){
    return string != null && string != '';
}