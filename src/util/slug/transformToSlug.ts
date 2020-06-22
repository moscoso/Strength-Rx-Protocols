/**
 * Transforms a string into a slug, which is meant to be a user friendly URI.
 * 
 * @param string the string to transform into a slug
 * @returns a string that is lowercase and that replaces all white space with dashes '-'
 */
export function transformToSlug(string: string): string {
    return string.trim().replace(/\s+/g, '-').toLowerCase();
}