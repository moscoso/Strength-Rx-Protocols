import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Workout, StandardExerciseRoutine } from 'src/app/core/state/workout/workout.model';
import { ModalController, ActionSheetController } from '@ionic/angular';
import { first, map } from 'rxjs/operators';
import { EditWorkoutPage } from '../edit-workout/edit-workout.page';
import { WorkoutFacade } from 'src/app/core/state/workout/workouts.facade';
import { ProfileFacade } from 'src/app/core/state/profile/profile.facade';
import { RouterStoreDispatcher } from 'src/app/core/state/router/router.dispatcher';
import { Program } from 'src/app/core/state/program/program.model';
import { ProgramFacade } from 'src/app/core/state/program/program.facade';
import { ClientFacade } from 'src/app/core/state/client/client.facade';
import { Client } from 'src/app/core/state/client/client.model';
import { CustomRouterReducerState } from 'src/app/core/state/router/router.state';
import { firstNonNullValue } from 'src/util/operator/Operators';

@Component({
    'selector': 'app-workout-detail',
    'templateUrl': './workout-detail.page.html',
    'styleUrls': ['./workout-detail.page.scss'],
})
export class WorkoutDetailPage implements OnInit {

    workout$: Observable < Workout > ;
    program$: Observable < Program > ;
    isTrainer$: Observable < boolean > ;
    isMasterWorkout = false;

    constructor(
        public profileService: ProfileFacade,
        public workoutService: WorkoutFacade,
        public programService: ProgramFacade,
        public clientService: ClientFacade,
        public modalCtrl: ModalController,
        public actionSheetCtrl: ActionSheetController,
        public routerService: RouterStoreDispatcher,
    ) {}

    ngOnInit() {
        this.initWorkout();
        this.isTrainer$ = this.profileService.selectUserIsTrainer();
    }

    async initWorkout() {
        const routerState = await this.routerService.selectState().pipe(first()).toPromise();
        const url = routerState.state.url;
        this.isMasterWorkout = url.indexOf('/workouts') === 0;
        if (this.isMasterWorkout) {
            this.workoutService.loadAll();
            this.workout$ = this.workoutService.selectWorkoutByRouteURL().pipe(firstNonNullValue);
        } else {
            this.findWorkoutInProgram();
        }
    }

    async findWorkoutInProgram() {
        const routerState = await this.routerService.selectState().pipe(first()).toPromise();
        const url = routerState.state.url;
        const isMasterProgram = url.indexOf('/programs') === 0;
        let program$: Observable<Program>;
        if (isMasterProgram) {
            program$ = this.loadMasterProgram();
        } else {
            program$ = this.loadCustomProgram(routerState);
        }
        const phaseIndex = routerState.state.params.phase;
        const dayIndex = routerState.state.params.day;
        this.workout$ = program$.pipe(
            first(program => program != null),
            map(program => program.phases[phaseIndex].schedule[dayIndex])
        );
    }

    loadMasterProgram(): Observable <Program> {
        this.programService.loadAll();
        return this.programService.selectProgramByRouteURL();
    }

    loadCustomProgram(routerState: CustomRouterReducerState): Observable < Program> {
        this.clientService.loadAll();
        const clientID = routerState.state.params.profileID ?? routerState.state.params.id;
        let client$: Observable < Client > ;
        if (clientID) {
            client$ = this.clientService.selectClient(clientID);
        } else {
            client$ = this.clientService.selectUserAsClient();
        }
        return client$.pipe(
            first(client => client != null),
            map(client => client.assignedProgram),
        );
    }

    doRefresh(event): void {
        this.workoutService.loadAll();
        this.workoutService.selectRequestInProgress().pipe(
            first(requestInProgress => requestInProgress === false),
        ).toPromise().then(() => {
            event.target.complete();
        });
    }

    async showEditModal(): Promise < void > {
        const modal = await this.modalCtrl.create({
            'id': 'edit-workout',
            'component': EditWorkoutPage,
            'cssClass': 'modal-full'
        });
        await modal.present();
        return;
    }

    async showActionSheetToDelete(): Promise < void > {
        const actionSheet = await this.actionSheetCtrl.create({
            'id': 'delete-workout',
            'header': 'Are you sure you want to delete?',
            'buttons': [
            {
                'text': 'Delete',
                'role': 'destructive',
                'icon': 'trash',
                'handler': () => { this.requestDelete(); }
            }, {
                'text': 'Cancel',
                'role': 'cancel'
            }],
        });
        actionSheet.present();
    }

    async requestDelete(): Promise < void > {
        const workout = await this.workout$.pipe(first()).toPromise();
        this.workoutService.delete(workout.id);
    }

    getNotes(routine: StandardExerciseRoutine) {
        if (!routine) { console.warn('getNotes failed because routine is undefined'); return; }
        let note = '';
        if (routine.sets) { note += `Sets: ${routine.sets} `; }
        if (routine.reps) { note += `Reps: ${routine.reps} `; }
        if (routine['%1rm']) { note += `%1RM: ${routine['%1rm']} `; }
        if (routine.rpe) { note += `RPE: ${routine.rpe} `; }
        if (routine.tempo) { note += `Tempo: ${routine.tempo} `; }
        if (routine.rest) { note += `Rest: ${routine.rest} `; }

        return note;
    }

}
