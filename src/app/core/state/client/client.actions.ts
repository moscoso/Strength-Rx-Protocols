import { Action } from '@ngrx/store';
import { Client } from './client.model';
import { Profile } from '../profile/profile.model';
import { Program } from '../program/program.model';

export enum ClientActionType {
    AllRequested = '[Clients Page] All Clients Requested',
    AllLoaded = '[Client Service] All Clients Loaded',
    AssignTrainerRequested = '[Client Service] Assign Trainer to Client Requested',
    TrainerAssigned = '[Assign Trainer Component] Assigned Trainer to Client',
    AssignProgramRequested = '[Client Service] Assign Program to Client Requested',
    ProgramAssigned = '[Assign Program Component] Assigned Program to Client',
    ClearProgramRequested = '[Assign Program Component] Clear Program Requested',
    ProgramCleared = '[Assign Program Component] Client Program Cleared',
    RequestFailed = '[Client Service] Request Failed',
}

export class AllRequested implements Action {
    readonly type = ClientActionType.AllRequested;
    constructor() {}
}

export class AllLoaded implements Action {
    readonly type = ClientActionType.AllLoaded;
    constructor(
        public clients: Client[],
    ) {}
}

export class RequestFailed implements Action {
    readonly type = ClientActionType.RequestFailed;
    constructor(public error: any) {}
}

export class AssignTrainerRequested implements Action {
    readonly type = ClientActionType.AssignTrainerRequested;
    constructor(public id: string, public trainer: Profile) {}
}

export class TrainerAssigned implements Action {
    readonly type = ClientActionType.TrainerAssigned;
    constructor(public id: string, public trainer: Profile) {}
}

export class AssignProgramRequested implements Action {
    readonly type = ClientActionType.AssignProgramRequested;
    constructor(public id: string, public program: Program) {}
}

export class ClearProgramRequested implements Action {
    readonly type = ClientActionType.ClearProgramRequested;
    constructor(public id: string) {}
}

export class ProgramAssigned implements Action {
    readonly type = ClientActionType.ProgramAssigned;
    constructor(public id: string, public program: Program) {}
}

export class ProgramCleared implements Action {
    readonly type = ClientActionType.ProgramCleared;
    constructor(public id: string) {}
}


/**
 * All of the actions related to Clients
 */
export type ClientAction =
    AllRequested |
    AllLoaded |
    AssignTrainerRequested |
    TrainerAssigned |
    AssignProgramRequested |
    ProgramAssigned |
    ClearProgramRequested |
    ProgramCleared |
    RequestFailed;
