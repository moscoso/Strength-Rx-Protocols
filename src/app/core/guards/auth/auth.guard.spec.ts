import { TestBed, async, inject } from '@angular/core/testing';

import { AuthGuard } from './auth.guard';
import { AuthService } from '../../firebase/auth/auth.service';

describe('AuthGuard', () => {
    beforeEach(() => {
        TestBed.configureTestingModule({
            'providers': [AuthGuard, AuthService],
        });
    });

    it('should inject', inject([AuthGuard], (guard: AuthGuard) => {
        expect(guard).toBeTruthy();
    }));
});