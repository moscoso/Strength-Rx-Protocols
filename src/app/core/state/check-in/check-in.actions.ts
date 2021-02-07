import { Action } from '@ngrx/store';
import { CheckIn } from './check-in.model';

export enum CheckInActionType {
    AllRequested = '[CheckIns Page] CheckIns Requested',
    AllLoaded = '[CheckIn Service] All CheckIns Loaded',
    Selected = '[CheckIns Page] CheckIn Selected',
    CreateRequested = '[CheckIn Service] Create CheckIn Requested',
    Created = 'CheckIns Effect] CheckIns Created',
    UpdateRequested = '[CheckIn Service] Edit CheckIn Requested',
    Updated = '[Edit CheckIn Page] CheckIn Updated',
    DeleteRequested = '[CheckIn Service] Delete CheckIn Requested',
    Deleted = '[CheckIn Page] CheckIn Deleted',
    RequestFailed = '[CheckIn Service] Request Failed',
}

export class AllRequested implements Action {
    readonly type = CheckInActionType.AllRequested;
    constructor() {}
}

export class AllLoaded implements Action {
    readonly type = CheckInActionType.AllLoaded;
    constructor(
        public checkIns: CheckIn[],
    ) {}
}

export class RequestFailed implements Action {
    readonly type = CheckInActionType.RequestFailed;
    constructor(public error: any) {}
}

export class Created implements Action {
    readonly type = CheckInActionType.Created;
    constructor(
        public checkIn: CheckIn,
    ) {}
}

export class CreateRequested implements Action {
    readonly type = CheckInActionType.CreateRequested;
    constructor(
        public checkIn: CheckIn,
    ) {}
}

export class Updated implements Action {
    readonly type = CheckInActionType.Updated;
    constructor(
        public id: string,
        public changes: Partial < CheckIn > ,
    ) {}
}

export class UpdateRequested implements Action {
    readonly type = CheckInActionType.UpdateRequested;
    constructor(
        public id: string,
        public changes: Partial < CheckIn > ,
    ) {}
}

export class Deleted implements Action {
    readonly type = CheckInActionType.Deleted;
    constructor(
        public id: string,
    ) {}
}

export class DeleteRequested implements Action {
    readonly type = CheckInActionType.DeleteRequested;
    constructor(
        public id: string,
    ) {}
}

/**
 * All of the actions related to CheckIns
 */
export type CheckInAction =
    AllRequested |
    AllLoaded |
    CreateRequested |
    Created |
    Updated |
    UpdateRequested |
    Deleted |
    DeleteRequested |
    RequestFailed;
