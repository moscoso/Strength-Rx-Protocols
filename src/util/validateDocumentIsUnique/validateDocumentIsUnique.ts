import { AbstractControl, ValidationErrors } from '@angular/forms';

/**
 * Validate that the document ID for exercises does not already exist
 * @param collectionName the name of the collection to check on firebase
 * @param ctrl the abstract form control to validate
 */
async function validateDocIDIsUnique(collectionName: string, ctrl: AbstractControl): Promise < ValidationErrors | null > {
    return this.firestore.doc(`${collectionName}/${ctrl.value}`).ref.get({
        'source': 'server',
    }).then(doc => doc.exists ? { 'entityIDTaken': true } : null).catch(reason =>
        ({ 'couldNotReachServer': reason }));
}

/**
 * Validate that the document ID for the exercise does not already exist
 * @param ctrl the abstract form control to validate
 */
export async function validateExerciseIsUnique(ctrl: AbstractControl): Promise < ValidationErrors | null > {
    return validateDocIDIsUnique(`exercises`, ctrl);
}

/**
 * Validate that the document ID for the food does not already exist
 * @param ctrl the abstract form control to validate
 */
export async function validateFoodIsUnique(ctrl: AbstractControl): Promise < ValidationErrors | null > {
    return validateDocIDIsUnique(`foods`, ctrl);
}
