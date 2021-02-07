import { createEntityAdapter, EntityState } from '@ngrx/entity';
import { CheckIn } from './check-in.model';

/**
 * Check-Ins are represented by an EntityState that
 * includes a dictionary of Check-Ins and the
 * list of ids that corresponds to each exercise
 */
export interface CheckInsState extends EntityState < CheckIn > {
    requestInProgress: boolean;
    error: any | null;
}

export const checkInsAdapter = createEntityAdapter < CheckIn > ({
    'selectId': checkIn => checkIn.id,
    'sortComparer': sortByTimestamp,
});

export const CHECK_INS_INIT_STATE: CheckInsState = checkInsAdapter.getInitialState({
    'requestInProgress': false,
    'error': null,
});



export function sortByTimestamp(a: CheckIn, b: CheckIn): number {
    const aTimestamp = a.timestamp.toISOString();
    const bTimestamp = b.timestamp.toISOString();
    return aTimestamp.localeCompare(bTimestamp);
}

