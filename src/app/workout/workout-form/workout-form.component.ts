import { Component, OnInit, Input, Output, EventEmitter, ViewChild, } from '@angular/core';
import { FormControl, Validators, FormGroup, AbstractControl, ValidationErrors } from '@angular/forms';
import { Observable } from 'rxjs';
import { Workout } from 'src/app/core/state/workout/workout.model';
import { ToastService } from 'src/app/shared/toast/toast.service';
import { transformToSlug } from 'src/util/slug/transformToSlug';
import { AngularFirestore } from '@angular/fire/firestore';
import { validateDocIDIsUnique } from 'src/util/verifyDocIsUnique/verifyDocIsUnique';
import { first } from 'rxjs/operators';
import { WorkoutStoreDispatcher } from 'src/app/core/state/workout/workouts.dispatcher';
import { ExerciseFacade } from 'src/app/core/state/exercises/exercises.facade';
import { StandardPhaseFormComponent } from './standard-phase-form/standard-phase-form.component';
import { IntervalPhaseFormComponent } from './interval-phase-form/interval-phase-form.component';
import { Delta } from 'src/util/delta/Delta';

@Component({
    'selector': 'workout-form',
    'templateUrl': './workout-form.component.html',
    'styleUrls': ['./workout-form.component.scss'],
})
export class WorkoutFormComponent implements OnInit {

    @Input() isCustom = false;
    @Input() buttonText = 'Submit';
    @Input() workout: Workout;
    @Output() formSubmit = new EventEmitter < Partial < Workout >> ();

    @ViewChild('standardPhase') standardPhase: StandardPhaseFormComponent;
    @ViewChild('intervalPhase') intervalPhase: IntervalPhaseFormComponent;

    form: FormGroup;

    name = new FormControl('', {
        'updateOn': 'blur',
        'validators': Validators.required,
        'asyncValidators': this.verifyWorkoutIsUnique.bind(this)
    });

    description = new FormControl('');


    requestInProgress$: Observable < boolean > ;

    defaultValue: Workout;

    standardPhaseEnabled = true;
    intervalPhaseEnabled = false;

    constructor(
        public workoutService: WorkoutStoreDispatcher,
        public exerciseService: ExerciseFacade,
        public toastService: ToastService,
        public firestore: AngularFirestore,
    ) {}

    ngOnInit() {
        this.workoutService.loadAll();
        this.form = new FormGroup({
            'name': this.name,
            'description': this.description,
        });
        this.requestInProgress$ = this.workoutService.selectRequestInProgress();

        if (this.workout) {
            this.initFormValues(this.workout);
        } else {
            this.workoutService.selectWorkoutByRouteURL().pipe(first(workout => workout != null)).toPromise()
                .then(workout => { this.initFormValues(workout); });
        }
    }

    initFormValues(workout: Workout) {
        this.defaultValue = workout;
        this.name.setValue(workout.name);
        this.description.setValue(workout.description);
        this.standardPhaseEnabled = workout.standardPhase != null;
        this.intervalPhaseEnabled = workout.intervalPhase != null;
    }

    onSubmit(form) {
        try {
            const values = this.createWorkoutFromForm();
            if (this.defaultValue === undefined || this.isCustom) {
                this.formSubmit.emit(values);
            } else {
                const changes = { ...Delta.object(this.defaultValue, values), 'id': this.defaultValue.id };
                this.formSubmit.emit(changes);
            }
        } catch (error) {
            this.toastService.failed(`Could not submit workout`, error);
        }
    }

    createWorkoutFromForm(): Partial < Workout > {
        const workout: Workout = this.form.getRawValue();
        let values: Partial < Workout > ;
        values = {
            'id': this.getSlug(workout.name),
            'name': workout.name,
            'description': workout.description,
            'standardPhase': this.standardPhaseEnabled.valueOf() ? this.standardPhase.getValue() : null,
            'intervalPhase': this.intervalPhaseEnabled.valueOf() ? this.intervalPhase.getValue() : null,
            'dateCreated': new Date(),
            'photoURL': '',
        };
        return values;
    }

    nameHasChanged() {
        return this.defaultValue !== undefined && this.defaultValue.name !== this.name.value;
    }

    getSlug(name: string) {
        return transformToSlug(name);
    }

    verifyWorkoutIsUnique(ctrl: AbstractControl): Promise < ValidationErrors | null > {
        if (this.isCustom || this.defaultValue) { return Promise.resolve(null); }
        return validateDocIDIsUnique(`workouts`, ctrl, this.firestore);
    }
}
