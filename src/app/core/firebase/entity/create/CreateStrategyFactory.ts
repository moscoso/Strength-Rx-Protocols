import { AngularFirestoreCollection } from '@angular/fire/firestore';
import { AngularFireFunctions } from '@angular/fire/functions';
import { IDCreateBehavior } from '../EntityServiceOptions';
import { CreateStrategy } from './CreateStrategy';
import { CreateIDFromAuthUser } from './CreateWithIDFromAuthUser';
import { CreateIDFromName } from './CreateWithIDFromName';
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
                return new CreateIDFromName(entityCollection);
            case 'authorizedUser':
                return new CreateIDFromAuthUser(functions, collectionName);
            default:
                return new CreateWithRandomID(entityCollection);
                
        }
    }
}