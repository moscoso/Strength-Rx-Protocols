import { createFeatureSelector } from '@ngrx/store';
import { AuthState } from './auth.state';

export const selectState = createFeatureSelector < AuthState > ('auth');
