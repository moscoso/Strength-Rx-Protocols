/**
 * The main data model specifying an Exercise
 */
export interface Exercise {
    id: string;
    name: string;
    /**
     * The Youtube ID is an 11 character case-sensitive alphanumeric string
     * that corresponds to the youtube video that demonstrates this
     * exercise
     */
    youtubeID: string;
    instructions: string;
    /**
     * An array of IDs corresponding to Exercises that could be done as
     * an alternative to this exercise
     */
    alternateIDs: string[];
}

export const EXERCISE_INIT_MODEL: Exercise = {
    'id': '',
    'name': '',
    'youtubeID': '',
    'instructions': '',
    'alternateIDs': [],
};
