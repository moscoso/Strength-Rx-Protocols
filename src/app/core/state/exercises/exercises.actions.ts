import { Action } from '@ngrx/store';
import { Exercise } from './exercises.state';

export enum ExerciseActionType {
    AllRequested = '[Exercise Page] Exercises Requested',
    AllLoaded = '[Exercise Service] All Exercises Loaded',
    Selected = '[Exercises Page] Exercise Selected',
    CreateRequested = '[Exercise Service] Create Exercise Requested',
    Created = '[Exercises Effect] Exercise Created',
    UpdateRequested = '[Exercise Service] Edit Exercise Requested',
    Updated = '[Edit Exercise Page] Exercise Updated',
    DeleteRequested = '[Exercise Service] Delete Exercise Requested',
    Deleted = '[Exercise Page] Exercise Deleted',
    RequestFailed = '[Exercise Service] Request Failed',
}

export class AllRequested implements Action {
    readonly type = ExerciseActionType.AllRequested;
    constructor() {}
}

export class AllLoaded implements Action {
    readonly type = ExerciseActionType.AllLoaded;
    constructor(
        public exercises: Exercise[],
    ) {}
}

export class RequestFailed implements Action {
    readonly type = ExerciseActionType.RequestFailed;
    constructor(public error: any) {}
}

export class Created implements Action {
    readonly type = ExerciseActionType.Created;
    constructor() {}
}

export class CreateRequested implements Action {
    readonly type = ExerciseActionType.CreateRequested;
    constructor(
        public exercise: Exercise,
    ) {}
}

export class Updated implements Action {
    readonly type = ExerciseActionType.Updated;
    constructor() {}
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
    constructor() {}
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
    CreateRequested |
    Created |
    Updated |
    UpdateRequested |
    Deleted |
    DeleteRequested |
    RequestFailed;
