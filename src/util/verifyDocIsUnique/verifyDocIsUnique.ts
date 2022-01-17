import { AbstractControl, ValidationErrors } from '@angular/forms';
import { AngularFirestore } from '@angular/fire/compat/firestore';

/**
 * Validate that the document ID for a given collection does not already exist
 *
 * @param collectionName the name of the collection to check on firebase
 * @param ctrl the abstract form control to validate
 * @param firestore the AngularFirestore service
 *
 * @returns `null` if the documentID is unique.
 * Otherwise a ValidationError object of `{'entityIDTaken': true}` will be returned
 */
export async function validateDocIDIsUnique(
    collectionName: string,
    ctrl: AbstractControl,
    firestore: AngularFirestore,
): Promise < ValidationErrors | null > {
    const path = `${collectionName}/${ctrl.value}`;
    return firestore.doc(path).ref.get({ 'source': 'server' })
        .then(doc => doc.exists ? { 'entityIDTaken': true } : null)
        .catch(reason => ({ 'couldNotReachServer': reason }));
}
