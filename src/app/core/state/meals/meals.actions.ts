import { Action } from '@ngrx/store';
import { Meal } from './meals.state';

export enum MealActionType {
    AllRequested = '[Meals Page] Meals Requested',
    AllLoaded = '[Meal Service] All Meals Loaded',
    Selected = '[Meals Page] Meal Selected',
    CreateRequested = '[Meal Service] Create Meal Requested',
    Created = 'Meals Effect] Meals Created',
    UpdateRequested = '[Meal Service] Edit Meal Requested',
    Updated = '[Edit Meal Page] Meal Updated',
    DeleteRequested = '[Meal Service] Delete Meal Requested',
    Deleted = '[Meal Page] Meal Deleted',
    RequestFailed = '[Meal Service] Request Failed',
}

export class AllRequested implements Action {
    readonly type = MealActionType.AllRequested;
    constructor() {}
}

export class AllLoaded implements Action {
    readonly type = MealActionType.AllLoaded;
    constructor(
        public meals: Meal[],
    ) {}
}

export class RequestFailed implements Action {
    readonly type = MealActionType.RequestFailed;
    constructor(public error: any) {}
}

export class Created implements Action {
    readonly type = MealActionType.Created;
    constructor(
        public meal: Meal,
    ) {}
}

export class CreateRequested implements Action {
    readonly type = MealActionType.CreateRequested;
    constructor(
        public meal: Meal,
    ) {}
}

export class Updated implements Action {
    readonly type = MealActionType.Updated;
    constructor(
        public id: string,
        public changes: Partial < Meal > ,
    ) {}
}

export class UpdateRequested implements Action {
    readonly type = MealActionType.UpdateRequested;
    constructor(
        public id: string,
        public changes: Partial < Meal > ,
    ) {}
}

export class Deleted implements Action {
    readonly type = MealActionType.Deleted;
    constructor(
        public id: string,
    ) {}
}

export class DeleteRequested implements Action {
    readonly type = MealActionType.DeleteRequested;
    constructor(
        public id: string,
    ) {}
}

/**
 * All of the actions related to Meals
 */
export type MealAction =
    AllRequested |
    AllLoaded |
    CreateRequested |
    Created |
    Updated |
    UpdateRequested |
    Deleted |
    DeleteRequested |
    RequestFailed;
