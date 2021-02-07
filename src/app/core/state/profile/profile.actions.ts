import { Action } from '@ngrx/store';
import { Profile } from './profile.model';

export enum ProfileActionType {
    AllRequested = '[Profiles Page] Profiles Requested',
    RefreshAllRequested = '[Profile List Referesher] All Profiles Refresh Requested',
    RefreshOneRequested = '[Profile List Referesher] One Profile Refresh Requested',
    AllLoaded = '[Profile Service] All Profiles Loaded',
    OneLoaded = '[Profile Service] One Profile Loaded',
    Selected = '[Profiles Page] Profile Selected',
    CreateRequested = '[Profile Service] Create Profile Requested',
    Created = 'Profiles Effect] Profiles Created',
    UpdateRequested = '[Profile Service] Edit Profile Requested',
    Updated = '[Edit Profile Page] Profile Updated',
    DeleteRequested = '[Profile Service] Delete Profile Requested',
    Deleted = '[Profile Page] Profile Deleted',
    RequestFailed = '[Profile Service] Request Failed',
    SignedOut = '[Auth Effects] SignedOut',
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

export class OneLoaded implements Action {
    readonly type = ProfileActionType.OneLoaded;
    constructor(
        public profile: Profile
    ) {}
}

export class RequestFailed implements Action {
    readonly type = ProfileActionType.RequestFailed;
    constructor(public error: any) {}
}

export class RefreshAllRequested implements Action {
    readonly type = ProfileActionType.RefreshAllRequested;
    constructor() {}
}

export class RefreshOneRequested implements Action {
    readonly type = ProfileActionType.RefreshOneRequested;
    constructor(
        public id: string
    ) {}
}

export class Created implements Action {
    readonly type = ProfileActionType.Created;
    constructor(public profile: Profile) {}
}

export class CreateRequested implements Action {
    readonly type = ProfileActionType.CreateRequested;
    constructor(
        public profile: Profile,
    ) {}
}

export class Updated implements Action {
    readonly type = ProfileActionType.Updated;
    constructor(
        public id: string,
        public changes: Partial < Profile >
    ) {}
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
    constructor(public id: string) {}
}

export class DeleteRequested implements Action {
    readonly type = ProfileActionType.DeleteRequested;
    constructor(
        public id: string,
    ) {}
}

export class SignedOut implements Action {
    readonly type = ProfileActionType.SignedOut;
    constructor() {}
}

/**
 * All of the actions related to Profiles
 */
export type ProfileAction =
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
    RequestFailed |
    SignedOut;
