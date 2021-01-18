import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Workout, StandardExerciseRoutine } from 'src/app/core/state/workouts/workouts.state';
import { ModalController, ActionSheetController } from '@ionic/angular';
import { first, map, tap } from 'rxjs/operators';
import { EditWorkoutPage } from '../edit-workout/edit-workout.page';
import { WorkoutStoreDispatcher } from 'src/app/core/state/workouts/workouts.dispatcher';
import { ProfileStoreDispatcher } from 'src/app/core/state/profile/profiles.dispatcher';
import { RouterStoreDispatcher } from 'src/app/core/state/router/router.dispatcher';
import { Program } from 'src/app/core/state/program/program.state';
import { ProgramStoreDispatcher } from 'src/app/core/state/program/program.dispatcher';
import { ClientStoreDispatcher } from 'src/app/core/state/client/client.dispatcher';
import { Client } from 'src/app/core/state/client/client.state';
import { CustomRouterReducerState } from 'src/app/core/state/router/router.state';

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
        public profileService: ProfileStoreDispatcher,
        public workoutService: WorkoutStoreDispatcher,
        public programService: ProgramStoreDispatcher,
        public clientService: ClientStoreDispatcher,
        public modalCtrl: ModalController,
        public actionSheetCtrl: ActionSheetController,
        public routerService: RouterStoreDispatcher,
    ) {}

    ngOnInit() {
        this.initWOrkout();
        this.isTrainer$ = this.profileService.selectUserIsTrainer();
    }

    async initWOrkout() {
        const routerState = await this.routerService.selectState().pipe(first()).toPromise();
        const url = routerState.state.url;
        this.isMasterWorkout = url.indexOf('/workouts') === 0;
        if (this.isMasterWorkout) {
            this.workoutService.loadAll();
            this.workout$ = this.workoutService.selectWorkoutByRouteURL().pipe(first(workout => workout != null));
        } else {
            console.log('yooo');
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
        const clientIsUser = routerState.state.url === '/profile/program';
        this.clientService.loadAll();
        const clientID = routerState.state.params.profileID;

        let client$: Observable < Client > ;
        if (clientID) {
            client$ = this.clientService.selectClient(clientID);
        } else {
            client$ = this.clientService.selectUserAsClient();
        }
        return client$.pipe(
            tap(x => console.log(x)),
            first(client => client != null),
            map(client => client.assignedProgram),
            tap(x => console.log(x))
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
