import { Action } from '@ngrx/store';
import { Exercise } from './exercises.state';

export enum ExerciseActionType {
    AllExercisesRequested = '[Exercise Page] Exercises Requested',
        AllExercisesLoaded = '[Exercise Service] All Exercises Loaded',
        RequestFailed = '[Exercise Service] Requested Failed',
        Selected = '[Exercisesz Page] Exercise Selected',
        Created = '[Create Exercise Page] Exercise Created',
        Updated = '[Edit Exercise Page] Exercise Updated',
        Deleted = '[Exercise Page] Exercise Deleted',
}

export class AllExercisesRequested implements Action {
    readonly type = ExerciseActionType.AllExercisesRequested;
    constructor() {}
}

export class AllExercisesLoaded implements Action {
    readonly type = ExerciseActionType.AllExercisesLoaded;
    constructor(
        public exercises: Exercise[],
    ) {}
}

export class RequestFailed implements Action {
    readonly type = ExerciseActionType.RequestFailed;
    constructor(public error: any) {}
}

export class CreatedExercise implements Action {
    readonly type = ExerciseActionType.Created;
    constructor(
        public exercise: Exercise,
    ) {}
}

export class UpdatedExercise implements Action {
    readonly type = ExerciseActionType.Updated;
    constructor(
        public id: string,
        public changes: Partial < Exercise > ,
    ) {}
}

export class DeletedExercise implements Action {
    readonly type = ExerciseActionType.Deleted;
    constructor(
        public id: string,
    ) {}
}

export type ExerciseAction =
    AllExercisesRequested |
    AllExercisesLoaded |
    CreatedExercise |
    UpdatedExercise |
    DeletedExercise |
    RequestFailed;
