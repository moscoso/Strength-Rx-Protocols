import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { Observable } from 'rxjs';
import { ClientFacade } from 'src/app/core/state/client/client.facade';
import { Client } from 'src/app/core/state/client/client.model';
import { Exercise } from 'src/app/core/state/exercise/exercise.model';
import { ProgramFacade } from 'src/app/core/state/program/program.facade';
import { Program } from 'src/app/core/state/program/program.model';
import { RouterStoreDispatcher } from 'src/app/core/state/router/router.dispatcher';
import { CustomRouterReducerState } from 'src/app/core/state/router/router.state';
import { IntervalExerciseRoutine, IntervalPhase, Workout } from 'src/app/core/state/workout/workout.model';
import { WorkoutFacade } from 'src/app/core/state/workout/workout.facade';
import { first, firstNonNullValue, pluck, whenNonNull } from 'src/util/operator/Operators';
import { ExerciseFacade } from '../../core/state/exercise/exercise.facade';

import { IntervalCountdownComponent } from '../interval-countdown/interval-countdown.component';

@Component({
    'selector': 'app-interval-timer',
    'templateUrl': './interval-timer.page.html',
    'styleUrls': ['./interval-timer.page.scss'],
})
export class IntervalTimerPage implements OnInit, AfterViewInit {

    intervalPhase: IntervalPhase;
    listOfRoutines: IntervalExerciseRoutine[] = [];
    isRunning = false;

    @ViewChild('myCD') countdownComponent: IntervalCountdownComponent;

    constructor(
        public exerciseService: ExerciseFacade,
        public workoutService: WorkoutFacade,
        public clientService: ClientFacade,
        public programService: ProgramFacade,
        public routerService: RouterStoreDispatcher,
    ) {}

    ngOnInit() {
        this.fetch();
    }

    async fetch() {
        this.clientService.loadAll();
        this.workoutService.loadAll();
        this.programService.loadAll();
        const router$ = this.routerService.selectState();
        const routerState = await router$.pipe(first()).toPromise();
        console.log(routerState);
        const programID = routerState.state.params.programID;
        const workoutID = routerState.state.params.workoutID;
        const profileID = routerState.state.params.profileID;
        if (programID) {
            const program$ = this.programService.selectProgramByRouteURL();
            const program = await whenNonNull(program$);
            this.doTheExtract(program, routerState);
        } else if (workoutID) {
            const workout$ = this.workoutService.selectWorkoutByRouteURL();
            whenNonNull(workout$).then(w => {
                this.doTheThing(w);
            });
        } else {
            const p$ = this.loadCustomProgram(routerState);
            const p = await whenNonNull(p$);
            this.doTheExtract(p, routerState);
        }
    }

    doTheExtract(program: Program, routerState) {
        const phaseIndex = routerState.state.params.phase;
        const phase = program.phases[phaseIndex];
        const dayIndex = routerState.state.params.day;
        this.doTheThing(phase.schedule[dayIndex]);
    }

    doTheThing(w: Workout) {
        this.intervalPhase = w.intervalPhase;
        this.intervalPhase.supersets.forEach(superset => {
            for (let times = 1; times <= superset.sets; times++) {
                superset.exerciseRoutines.forEach(routine => {
                    this.listOfRoutines.push(routine);
                });
            }
        });
    }

    loadCustomProgram(routerState: CustomRouterReducerState): Observable < Program > {
        this.clientService.loadAll();
        const clientID = routerState.state.params.profileID ?? routerState.state.params.id;
        let client$: Observable < Client > ;
        if (clientID) {
            client$ = this.clientService.selectClient(clientID);
        } else {
            client$ = this.clientService.selectUserAsClient();
        }
        return client$.pipe(
            firstNonNullValue,
            pluck('assignedProgram'),
        );
    }

    ngAfterViewInit() {
        // console.log(this.countdown);
    }

    build(exercises: Exercise[], i: number, duration = 10, reps = 'AMRAP'): IntervalExerciseRoutine {
        return {
            'exercise': i == null ? null : exercises[i],
            'duration': duration,
            'reps': reps
        };
    }

    getYoutubeThumbnail(youtubeID) {
        if (youtubeID && youtubeID !== '') {
            return `https://i3.ytimg.com/vi/${youtubeID}/default.jpg`;
        } else {
            return `assets/icon/rest.png`;
        }
    }

    start() {
        this.countdownComponent.begin();
        this.isRunning = true;
    }

}
