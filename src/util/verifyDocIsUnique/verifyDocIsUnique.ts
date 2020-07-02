import { AbstractControl, ValidationErrors } from '@angular/forms';
import { AngularFirestore } from '@angular/fire/firestore/firestore';

/**
 * Validate that the document ID for exercises does not already exist
 * @param collectionName the name of the collection to check on firebase
 * @param ctrl the abstract form control to validate
 */
export async function validateDocIDIsUnique(
    collectionName: string,
    ctrl: AbstractControl,
    firestore: AngularFirestore,
): Promise < ValidationErrors | null > {
    return firestore.doc(`${collectionName}/${ctrl.value}`).ref.get({
        'source': 'server',
    }).then(doc => doc.exists ? { 'entityIDTaken': true } : null).catch(reason =>
        ({ 'couldNotReachServer': reason }));
}


