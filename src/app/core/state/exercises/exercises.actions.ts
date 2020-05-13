import { Action } from '@ngrx/store';
import { Exercise } from './exercises.state';

export enum ExerciseActionType {
    Load_Initiated = '[Exercise Service] Exercises Load Initiated',
    Load_Succeeded = '[Exercise Service] Loading Exercises Succeeded',
    Load_Failed = '[Exercise Service] Loading Exercises Failed',
    Selected = '[Exercise Page] Exercise Selected',
    Created = '[Exercise Page] Exercise Created',
    Updated = '[Exercise Page] Exercise Updated',
    Deleted = '[Exercise Page] Exercise Deleted',
}

export class LoadedExercises implements Action {
    readonly type = ExerciseActionType.Load_Initiated;
    constructor(
        public exercises: Exercise[],
    ) {}
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

export type ExerciseAction = LoadedExercises | CreatedExercise | UpdatedExercise | DeletedExercise;
