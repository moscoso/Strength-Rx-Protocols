/**
 * A Timestamp represents a point in time independent of any time zone or calendar,
 * represented as seconds and fractions of seconds at nanosecond resolution in UTC Epoch time.
 * It is encoded using the Proleptic Gregorian Calendar which extends the Gregorian calendar backwards to year one.
 * It is encoded assuming all minutes are 60 seconds long, i.e. leap seconds are "smeared" so that no leap second table
 * is needed for interpretation. Range is from 0001-01-01T00:00:00Z to 9999-12-31T23:59:59.999999999Z.
 * By restricting to that range, we ensure that we can convert to and from RFC 3339 date strings.
 * https://firebase.google.com/docs/reference/android/com/google/firebase/Timestamp
 */
export interface Timestamp {
    readonly seconds: number;
    readonly nanoseconds: number;
    toDate(): Date;
    toMillis(): number;
    isEqual(other: Timestamp): boolean;
}
