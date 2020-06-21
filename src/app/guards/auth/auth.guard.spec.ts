import { TestBed, inject } from '@angular/core/testing';

import { AuthGuard } from './auth.guard';
import { FireAuthService } from 'src/app/core/firebase/auth/auth.service';

describe('AuthGuard', () => {
    beforeEach(() => {
        TestBed.configureTestingModule({
            'providers': [AuthGuard, FireAuthService],
        });
    });

    it('should inject', inject([AuthGuard], (guard: AuthGuard) => {
        expect(guard).toBeTruthy();
    }));
});
