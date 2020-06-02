import { Action } from '@ngrx/store';
import { Profile } from './profile.state';

export enum ProfileActionType {
    AllRequested = '[Profiles Page] Profiles Requested',
    AllLoaded = '[Profile Service] All Profiles Loaded',
    Selected = '[Profiles Page] Profile Selected',
    CreateRequested = '[Profile Service] Create Profile Requested',
    Created = 'Profiles Effect] Profiles Created',
    UpdateRequested = '[Profile Service] Edit Profile Requested',
    Updated = '[Edit Profile Page] Profile Updated',
    DeleteRequested = '[Profile Service] Delete Profile Requested',
    Deleted = '[Profile Page] Profile Deleted',
    RequestFailed = '[Profile Service] Request Failed',
}

export class AllRequested implements Action {
    readonly type = ProfileActionType.AllRequested;
    constructor() {}
}

export class AllLoaded implements Action {
    readonly type = ProfileActionType.AllLoaded;
    constructor(
        public profiles: Profile[],
    ) {}
}

export class RequestFailed implements Action {
    readonly type = ProfileActionType.RequestFailed;
    constructor(public error: any) {}
}

export class Created implements Action {
    readonly type = ProfileActionType.Created;
    constructor() {}
}

export class CreateRequested implements Action {
    readonly type = ProfileActionType.CreateRequested;
    constructor(
        public profile: Profile,
    ) {}
}

export class Updated implements Action {
    readonly type = ProfileActionType.Updated;
    constructor() {}
}

export class UpdateRequested implements Action {
    readonly type = ProfileActionType.UpdateRequested;
    constructor(
        public id: string,
        public changes: Partial < Profile > ,
    ) {}
}

export class Deleted implements Action {
    readonly type = ProfileActionType.Deleted;
    constructor() {}
}

export class DeleteRequested implements Action {
    readonly type = ProfileActionType.DeleteRequested;
    constructor(
        public id: string,
    ) {}
}

/**
 * All of the actions related to Profiles
 */
export type ProfileAction =
    AllRequested |
    AllLoaded |
    CreateRequested |
    Created |
    Updated |
    UpdateRequested |
    Deleted |
    DeleteRequested |
    RequestFailed;
