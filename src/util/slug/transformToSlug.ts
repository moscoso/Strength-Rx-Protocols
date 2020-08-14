/**
 * Transforms a string into a slug, which is meant to be a user friendly URI.
 *
 * @param string the string to transform into a slug
 * @returns a string that is lowercase, only includes dashes and alphanumerical characters,
 *  and that replaces all white space with dashes '-'
 */
export function transformToSlug(s: string): string {
    if (s == null) {
        throw new Error(`Cannot transform undefined into a slug`);
    }
    return s.trim().replace(/[^0-9a-z\-\s]/gi, '').replace(/\s+/g, '-').toLowerCase();
}
