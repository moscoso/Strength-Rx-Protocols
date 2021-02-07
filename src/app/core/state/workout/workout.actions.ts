import { Action } from '@ngrx/store';
import { Workout } from './workout.model';

export enum WorkoutActionType {
    AllRequested = '[Workouts Page] Workouts Requested',
    AllLoaded = '[Workout Service] All Workouts Loaded',
    Selected = '[Workouts Page] Workout Selected',
    CreateRequested = '[Workout Service] Create Workout Requested',
    Created = 'Workouts Effect] Workouts Created',
    UpdateRequested = '[Workout Service] Edit Workout Requested',
    Updated = '[Edit Workout Page] Workout Updated',
    DeleteRequested = '[Workout Service] Delete Workout Requested',
    Deleted = '[Workout Page] Workout Deleted',
    RequestFailed = '[Workout Service] Request Failed',
}

export class AllRequested implements Action {
    readonly type = WorkoutActionType.AllRequested;
    constructor() {}
}

export class AllLoaded implements Action {
    readonly type = WorkoutActionType.AllLoaded;
    constructor(
        public workouts: Workout[],
    ) {}
}

export class RequestFailed implements Action {
    readonly type = WorkoutActionType.RequestFailed;
    constructor(public error: any) {}
}

export class Created implements Action {
    readonly type = WorkoutActionType.Created;
    constructor(
        public workout: Workout,
    ) {}
}

export class CreateRequested implements Action {
    readonly type = WorkoutActionType.CreateRequested;
    constructor(
        public workout: Workout,
    ) {}
}

export class Updated implements Action {
    readonly type = WorkoutActionType.Updated;
    constructor(
        public id: string,
        public changes: Partial < Workout > ,
    ) {}
}

export class UpdateRequested implements Action {
    readonly type = WorkoutActionType.UpdateRequested;
    constructor(
        public id: string,
        public changes: Partial < Workout > ,
    ) {}
}

export class Deleted implements Action {
    readonly type = WorkoutActionType.Deleted;
    constructor(
        public id: string,
    ) {}
}

export class DeleteRequested implements Action {
    readonly type = WorkoutActionType.DeleteRequested;
    constructor(
        public id: string,
    ) {}
}

/**
 * All of the actions related to Workouts
 */
export type WorkoutAction =
    AllRequested |
    AllLoaded |
    CreateRequested |
    Created |
    Updated |
    UpdateRequested |
    Deleted |
    DeleteRequested |
    RequestFailed;
