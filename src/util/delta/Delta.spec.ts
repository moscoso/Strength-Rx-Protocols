import {
    Delta,
} from './Delta';

describe('Delta', () => {
    describe('Object', () => {
        it('return an empty object for two objects that have the same key value pair (number)', () => {
            const a = {
                'apples': 2,
                'bananas': 3,
            };
            const b = {
                'apples': 2,
                'bananas': 3,
            };
            expect(Delta.object(a, b)).toEqual({});
        });

        it('return an empty object for two objects that have the same key value pair (boolean)', () => {
            const a = {
                'apples': true,
                'bananas': true,
            };
            const b = {
                'apples': true,
                'bananas': true,
            };
            expect(Delta.object(a, b)).toEqual({});
        });

        it('return an empty object for two objects that have the same key value pair (string)', () => {
            const a = {
                'apples': 'a',
                'bananas': 'b',
            };
            const b = {
                'apples': 'a',
                'bananas': 'b',
            };
            expect(Delta.object(a, b)).toEqual({});
        });

        it('return an empty object for two objects that have the same key value pair (array)', () => {
            const a = {
                'apples': ['a', 'p', 'p'],
                'bananas': ['b', 'a', 'n'],
            };
            const b = {
                'apples': ['a', 'p', 'p'],
                'bananas': ['b', 'a', 'n'],
            };
            expect(Delta.object(a, b)).toEqual({});
        });

        it('return an empty object for two objects that have the same key value pair (null)', () => {
            const a = {
                'apples': null,
                'bananas': null,
            };
            const b = {
                'apples': null,
                'bananas': null,
            };
            expect(Delta.object(a, b)).toEqual({});
        });

        it('return an empty object for two objects that have the same key value pair (undefined)',
    () => {
            const a = {
                'apples': undefined,
                'bananas': undefined,
            };
            const b = {
                'apples': undefined,
                'bananas': undefined,
            };
            expect(Delta.object(a, b)).toEqual({});
        });

        it('considers null and undefined to be different', () => {
            const a = {
                'apples': null,
                'bananas': undefined,
            };
            const b = {
                'apples': undefined,
                'bananas': null,
            };
            expect(Delta.object(a, b)).toEqual({
                'apples': undefined,
                'bananas': null,
            });
        });

        it('return an object with only the single key value pair that changes (number)', () => {
            const a = {
                'apples': 2,
                'bananas': 3,
            };
            const b = {
                'apples': 3,
                'bananas': 3,
            };
            expect(Delta.object(a, b)).toEqual({
                'apples': 3,
            });
        });

        it('return an object with only the single key value pair that changes (boolean)', () => {
            const a = {
                'apples': true,
                'bananas': true,
            };
            const b = {
                'apples': false,
                'bananas': true,
            };
            expect(Delta.object(a, b)).toEqual({
                'apples': false,
            });
        });

        it('return an object with only the single key value pair that changes (string)', () => {
            const a = {
                'apples': 'a',
                'bananas': 'b',
            };
            const b = {
                'apples': 'c',
                'bananas': 'b',
            };
            expect(Delta.object(a, b)).toEqual({
                'apples': 'c',
            });
        });

        it('return an object with only the single key value pair that changes (array)', () => {
            const a = {
                'apples': ['a', 'p', 'p'],
                'bananas': ['b', 'a', 'n'],
            };
            const b = {
                'apples': ['l', 'e', 's'],
                'bananas': ['b', 'a', 'n'],
            };
            expect(Delta.object(a, b)).toEqual({
                'apples': ['l', 'e', 's'],
            });
        });

        it('return an object with only the single key value pair that changes (arrays with different length)',
            () => {
                const a = {
                    'apples': ['a', 'p', 'p'],
                    'bananas': ['b', 'a', 'n'],
                };
                const b = {
                    'apples': ['a', 'p', 'p', 'X'],
                    'bananas': ['b', 'a', 'n'],
                };
                expect(Delta.object(a, b)).toEqual({
                    'apples': ['a', 'p', 'p', 'X'],
                });
            });

        it(`the order of the objects being delta'd determines the key value pair that is returned`,
        () => {
                const a = {
                    'apples': 2,
                    'bananas': 3,
                };
                const b = {
                    'apples': 3,
                    'bananas': 3,
                };
                expect(Delta.object(b, a)).toEqual({
                    'apples': 2,
                });
            });

    });
});
