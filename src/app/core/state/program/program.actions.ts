import { Action } from '@ngrx/store';
import { Program } from './program.model';

export enum ProgramActionType {
    AllRequested = '[Programs Page] Programs Requested',
    AllLoaded = '[Program Service] All Programs Loaded',
    Selected = '[Programs Page] Program Selected',
    CreateRequested = '[Program Service] Create Program Requested',
    Created = '[Programs Effect] Programs Created',
    UpdateRequested = '[Program Service] Edit Program Requested',
    Updated = '[Edit Program Page] Program Updated',
    DeleteRequested = '[Program Service] Delete Program Requested',
    Deleted = '[Program Page] Program Deleted',
    RequestFailed = '[Program Service] Request Failed',
}

export class AllRequested implements Action {
    readonly type = ProgramActionType.AllRequested;
    constructor() {}
}

export class AllLoaded implements Action {
    readonly type = ProgramActionType.AllLoaded;
    constructor(
        public programs: Program[],
    ) {}
}

export class RequestFailed implements Action {
    readonly type = ProgramActionType.RequestFailed;
    constructor(public error: any) {}
}

export class Created implements Action {
    readonly type = ProgramActionType.Created;
    constructor(
        public program: Program,
    ) {}
}

export class CreateRequested implements Action {
    readonly type = ProgramActionType.CreateRequested;
    constructor(
        public program: Program,
    ) {}
}

export class Updated implements Action {
    readonly type = ProgramActionType.Updated;
    constructor(
        public id: string,
        public changes: Partial < Program > ,
    ) {}
}

export class UpdateRequested implements Action {
    readonly type = ProgramActionType.UpdateRequested;
    constructor(
        public id: string,
        public changes: Partial < Program > ,
    ) {}
}

export class Deleted implements Action {
    readonly type = ProgramActionType.Deleted;
    constructor(
        public id: string,
    ) {}
}

export class DeleteRequested implements Action {
    readonly type = ProgramActionType.DeleteRequested;
    constructor(
        public id: string,
    ) {}
}

/**
 * All of the actions related to Programs
 */
export type ProgramAction =
    AllRequested |
    AllLoaded |
    CreateRequested |
    Created |
    Updated |
    UpdateRequested |
    Deleted |
    DeleteRequested |
    RequestFailed;
