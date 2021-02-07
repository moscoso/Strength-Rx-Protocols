import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { Workout } from 'src/app/core/state/workout/workout.model';
import { Observable, of } from 'rxjs';
import { FormControl, Validators, FormGroup } from '@angular/forms';
import { WorkoutStoreDispatcher } from 'src/app/core/state/workout/workouts.dispatcher';
import { ModalController } from '@ionic/angular';

@Component({
    'selector': 'app-subscribe-to-workout',
    'templateUrl': './subscribe-to-workout.component.html',
    'styleUrls': ['./subscribe-to-workout.component.scss'],
})
export class SubscribeToWorkoutComponent implements OnInit {

    form: FormGroup;
    requestInProgress$: Observable < boolean > ;
    workoutList$: Observable < Workout[] > = of ([]);
    workoutControl = new FormControl(null, [Validators.required]);


    constructor(
        public workoutService: WorkoutStoreDispatcher,
        public modalController: ModalController,
    ) {}

    ngOnInit() {
        this.form = new FormGroup({
            'workout': this.workoutControl,
        });

        this.requestInProgress$ = this.workoutService.selectRequestInProgress();
        this.workoutService.loadAll();
        this.workoutList$ = this.workoutService.selectAll();
    }

    onSubmit(form) {
        this.modalController.dismiss({'workout': form.workout}, undefined, 'subscribe-to-workout');
    }


    /**
     * A function to compare the option values with the selected values.
     * @param e1 the first argument is a value from an option.
     * @param e2 the second is a value from the selection.
     * @returns a boolean should be returned.
     */
    compareWorkouts(e1: Workout, e2: Workout): boolean {
        return e1 && e2 ? e1.id === e2.id : e1 === e2;
    }

}
