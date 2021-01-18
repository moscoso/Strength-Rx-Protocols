import { Injectable } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { Observable, from, of } from 'rxjs';
import { switchMap, tap, timeout, catchError } from 'rxjs/operators';

import { ProgramAction, ProgramActionType } from './program.actions';
import * as Programs from './program.actions';
import { ProgramService } from '../../firebase/program/program.service';
import { ModalController } from '@ionic/angular';
import { ToastService } from 'src/app/shared/toast/toast.service';
import { Router } from '@angular/router';

@Injectable()
export class ProgramEffects {

    TIMEOUT_WINDOW = 10000;

    @Effect({ 'dispatch': false }) error$: Observable < ProgramAction > = this.actions$.pipe(
        ofType(ProgramActionType.RequestFailed),
        tap((action: Programs.RequestFailed) => {
            this.toaster.failed('Programs Error', action.error.message);
        })
    );

    @Effect() allRequested$: Observable < ProgramAction > = this.actions$.pipe(
        ofType < ProgramAction > (ProgramActionType.AllRequested),
        switchMap((action: Programs.AllRequested) => {
            return from(this.programService.getAll()
                .then(programs => new Programs.AllLoaded(programs))
                .catch(error => new Programs.RequestFailed(error))
            ).pipe(
                timeout(this.TIMEOUT_WINDOW),
                catchError(() => {
                    const errorMessage = `The request to load programs timed out. ${this.TIMEOUT_WINDOW / 1000} seconds.
                    Please check your internet connection and try again`;
                    return of(new Programs.RequestFailed(new Error(errorMessage)));
                })
            );
        })
    );

    @Effect() createRequested$: Observable < ProgramAction > = this.actions$.pipe(
        ofType < ProgramAction > (ProgramActionType.CreateRequested),
        switchMap((action: Programs.CreateRequested) => {
            return from(this.programService.create(action.program)
                .then((program) => new Programs.Created(program))
                .catch(error => new Programs.RequestFailed(error))
            );
        })
    );


    @Effect() updateRequested$: Observable < ProgramAction > = this.actions$.pipe(
        ofType < ProgramAction > (ProgramActionType.UpdateRequested),
        switchMap((action: Programs.UpdateRequested) => {
            return from(this.programService.update(action.id, action.changes)
                .then(() => new Programs.Updated(action.id, action.changes))
                .catch(error => new Programs.RequestFailed(error))
            );
        })
    );

    @Effect() deleteRequested$: Observable < ProgramAction > = this.actions$.pipe(
        ofType < ProgramAction > (ProgramActionType.DeleteRequested),
        switchMap((action: Programs.DeleteRequested) => {
            return from(this.programService.delete(action.id)
                .then(() => new Programs.Deleted(action.id))
                .catch(error => new Programs.RequestFailed(error))
            );
        })
    );

    @Effect({ 'dispatch': false }) formCompleted$: Observable < ProgramAction > = this.actions$.pipe(
        ofType < ProgramAction > (ProgramActionType.Created, ProgramActionType.Updated),
        tap((action: Programs.CreateRequested) => {
            this.modalController.dismiss();
            // this.router.navigateByUrl('/programs');
        })
    );

    @Effect({ 'dispatch': false }) deleted$: Observable < ProgramAction > = this.actions$.pipe(
        ofType < ProgramAction > (ProgramActionType.Deleted),
        tap((action: Programs.CreateRequested) => {
            this.router.navigateByUrl('/programs');
        })
    );

    constructor(
        private programService: ProgramService,
        private actions$: Actions,
        private modalController: ModalController,
        private toaster: ToastService,
        private router: Router,
    ) {}
}
