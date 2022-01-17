import { AngularFirestoreCollection } from '@angular/fire/compat/firestore';
import { AngularFireFunctions } from '@angular/fire/compat/functions';
import { IDCreateBehavior } from '../EntityServiceOptions';
import { CreateStrategy } from './CreateStrategy';
import { CreateIDFromAuthUser as CreateWithIDFromAuthUser } from './CreateWithIDFromAuthUser';
import { CreateIDFromName as CreateWithIDFromName } from './CreateWithIDFromName';
import { CreateWithRandomID } from './CreateWithRandomID';

export class CreateStrategyFactory {

    private constructor() {}

    public static make(
        IDSource: IDCreateBehavior,
        entityCollection: AngularFirestoreCollection < any >,
        functions: AngularFireFunctions,
        collectionName: string,
    ): CreateStrategy<any> {
        switch (IDSource) {
            case 'name':
                return new CreateWithIDFromName(entityCollection);
            case 'authorizedUser':
                return new CreateWithIDFromAuthUser(functions, collectionName);
            default:
                return new CreateWithRandomID(entityCollection);
        }
    }
}
