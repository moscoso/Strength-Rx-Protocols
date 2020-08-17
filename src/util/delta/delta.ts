export class Delta {

    /**
     * Return an object that represents the difference between two objects.
     * Order matters! The returned difference object will use the values from a
     * Only works with shallow objects. Nested objects will not be tested for equality.
     */
    public static object(a: object, b: object): object {
        const diff = Object.assign({}, a, b);
        Object.keys(a).forEach((key) => {
            const valueA = a[key];
            const valueB = b[key];
            let valuesMatch: boolean;
            if (valueA instanceof Array && valueB instanceof Array) {
                valuesMatch = this.arraysMatch(valueA, valueB);
            } else {
                valuesMatch = valueA === valueB;
            }

            if (valuesMatch) {
                delete diff[key];
            }
        });
        return diff;
    }

    private static arraysMatch(a: any[], b: any[]): boolean {
        const differentSizes = a.length !== b.length;
        if (differentSizes) { return false;  }

        a.forEach((value, index) => {
            const mismatchFound = a[index] !== b[index];
            if (mismatchFound) {
                return false;
            }
        });

        return true;
    }
}
