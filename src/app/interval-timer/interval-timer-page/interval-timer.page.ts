import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { first } from 'rxjs/operators';
import { Exercise } from 'src/app/core/state/exercises/exercise.model';
import { RouterStoreDispatcher } from 'src/app/core/state/router/router.dispatcher';
import { IntervalExerciseRoutine, IntervalPhase } from 'src/app/core/state/workout/workout.model';
import { WorkoutStoreDispatcher } from 'src/app/core/state/workout/workouts.dispatcher';
import { ExerciseFacade } from '../../core/state/exercises/exercises.facade';

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
        public workoutService: WorkoutStoreDispatcher,
        public routerService: RouterStoreDispatcher,
    ) {}

    ngOnInit() {
        this.workoutService.loadAll();
        const router$ = this.routerService.selectState();
        router$.pipe(first()).toPromise().then(r => console.log(r));
        const workout$ = this.workoutService.selectWorkoutByRouteURL();
        workout$.pipe(first(w => w != null)).toPromise().then(w => {
            this.intervalPhase = w.intervalPhase;
            this.intervalPhase.supersets.forEach(superset => {
                for (let times = 1; times <= superset.sets; times++) {
                    superset.exerciseRoutines.forEach(routine => {
                        this.listOfRoutines.push(routine);
                    });
                }
            });
        });
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
