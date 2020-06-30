/**
 * Transforms a string into a slug, which is meant to be a user friendly URI.
 *
 * @param string the string to transform into a slug
 * @returns a string that is lowercase and that replaces all white space with dashes '-'
 */
export function transformToSlug(s: string): string {
    if (s == null) {
        throw new Error(`Cannot transform undefined into a slug`);
    }
    return s.trim().replace(/\s+/g, '-').toLowerCase();
}
