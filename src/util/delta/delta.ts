export class Delta {

    /**
     * Return an object that represents the difference between two objects.
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
        if (a.length !== b.length) {
            return false;
        }

        let arraysMatch = true;
        a.forEach((value, index) => {
            if (a[index] !== b[index]) {
                arraysMatch = false;
            }
        });

        return arraysMatch;
    }
}
