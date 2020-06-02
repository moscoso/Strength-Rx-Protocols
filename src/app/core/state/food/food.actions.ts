import { Action } from '@ngrx/store';
import { Food } from './food.state';

export enum FoodActionType {
    AllRequested = '[Foods Page] Foods Requested',
    AllLoaded = '[Food Service] All Foods Loaded',
    Selected = '[Foods Page] Food Selected',
    CreateRequested = '[Food Service] Create Food Requested',
    Created = 'Foods Effect] Foods Created',
    UpdateRequested = '[Food Service] Edit Food Requested',
    Updated = '[Edit Food Page] Food Updated',
    DeleteRequested = '[Food Service] Delete Food Requested',
    Deleted = '[Food Page] Food Deleted',
    RequestFailed = '[Food Service] Request Failed',
}

export class AllRequested implements Action {
    readonly type = FoodActionType.AllRequested;
    constructor() {}
}

export class AllLoaded implements Action {
    readonly type = FoodActionType.AllLoaded;
    constructor(
        public foods: Food[],
    ) {}
}

export class RequestFailed implements Action {
    readonly type = FoodActionType.RequestFailed;
    constructor(public error: any) {}
}

export class Created implements Action {
    readonly type = FoodActionType.Created;
    constructor() {}
}

export class CreateRequested implements Action {
    readonly type = FoodActionType.CreateRequested;
    constructor(
        public food: Food,
    ) {}
}

export class Updated implements Action {
    readonly type = FoodActionType.Updated;
    constructor() {}
}

export class UpdateRequested implements Action {
    readonly type = FoodActionType.UpdateRequested;
    constructor(
        public id: string,
        public changes: Partial < Food > ,
    ) {}
}

export class Deleted implements Action {
    readonly type = FoodActionType.Deleted;
    constructor() {}
}

export class DeleteRequested implements Action {
    readonly type = FoodActionType.DeleteRequested;
    constructor(
        public id: string,
    ) {}
}

/**
 * All of the actions related to Foods
 */
export type FoodAction =
    AllRequested |
    AllLoaded |
    CreateRequested |
    Created |
    Updated |
    UpdateRequested |
    Deleted |
    DeleteRequested |
    RequestFailed;
