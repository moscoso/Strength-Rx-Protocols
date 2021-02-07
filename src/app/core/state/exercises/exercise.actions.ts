import { Action } from '@ngrx/store';
import { Exercise } from './exercise.model';

export enum ExerciseActionType {
    /* FetchAllFromServerRequested, // Try this after we check the cache
    FetchAllFromCacheRequested, // Try this first when all requested or FetchAllFromServerRequested fails,
    // but skip this if it was checked in the last 24 hours?
    FetchOneFromServerRequested, // Do this when you visit the entity detail
    FetchOneFromCacheRequested, // Do this if fetch one from server fails,*/
    AllRequested = '[Exercise List] Exercises Requested',
    OneRequested = '[Exercise Detail Page] One Exercise Requested',
    RefreshAllRequested = '[Exercise List Referesher] All Exercises Refresh Requested',
    RefreshOneRequested = '[Exercise List Referesher] One Exercise Refresh Requested',
    AllLoaded = '[Exercise Service] All Exercises Loaded',
    OneLoaded = '[Exercise Service] One Exercise Loaded',
    Selected = '[Exercises Page] Exercise Selected',
    CreateRequested = '[Create Exercise Page] Create Exercise Requested',
    Created = '[Exercises Effect] Exercise Created',
    UpdateRequested = '[Exercise Service] Edit Exercise Requested',
    Updated = '[Edit Exercise Page] Exercise Updated',
    DeleteRequested = '[Edit Exercise Page] Delete Exercise Requested',
    Deleted = '[Exercises Effect] Exercise Deleted',
    RequestFailed = '[Exercise Service] Request Failed',
}

export class AllRequested implements Action {
    readonly type = ExerciseActionType.AllRequested;
    constructor() {}
}

export class RefreshAllRequested implements Action {
    readonly type = ExerciseActionType.RefreshAllRequested;
    constructor() {}
}

export class RefreshOneRequested implements Action {
    readonly type = ExerciseActionType.RefreshOneRequested;
    constructor(
        public id: string
    ) {}
}

export class AllLoaded implements Action {
    readonly type = ExerciseActionType.AllLoaded;
    constructor(
        public exercises: Exercise[],
    ) {}
}

export class OneLoaded implements Action {
    readonly type = ExerciseActionType.OneLoaded;
    constructor(
        public exercise: Exercise
    ) {}
}

export class RequestFailed implements Action {
    readonly type = ExerciseActionType.RequestFailed;
    constructor(public error: any) {}
}

export class Created implements Action {
    readonly type = ExerciseActionType.Created;
    constructor(
        public exercise: Exercise,
    ) {}
}

export class CreateRequested implements Action {
    readonly type = ExerciseActionType.CreateRequested;
    constructor(
        public exercise: Exercise,
    ) {}
}

export class Updated implements Action {
    readonly type = ExerciseActionType.Updated;
    constructor(
        public id: string,
        public changes: Partial < Exercise > ,
    ) {}
}

export class UpdateRequested implements Action {
    readonly type = ExerciseActionType.UpdateRequested;
    constructor(
        public id: string,
        public changes: Partial < Exercise > ,
    ) {}
}

export class Deleted implements Action {
    readonly type = ExerciseActionType.Deleted;
    constructor(
        public id: string,
    ) {}
}

export class DeleteRequested implements Action {
    readonly type = ExerciseActionType.DeleteRequested;
    constructor(
        public id: string,
    ) {}
}

/**
 * All of the actions related to Exercises
 */
export type ExerciseAction =
    AllRequested |
    AllLoaded |
    OneLoaded |
    CreateRequested |
    Created |
    Updated |
    UpdateRequested |
    Deleted |
    DeleteRequested |
    RefreshAllRequested |
    RefreshOneRequested |
    RequestFailed;
