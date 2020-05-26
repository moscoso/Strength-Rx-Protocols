import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Store } from '@ngrx/store';
import * as fromExercises from '../../core/state/exercises/exercises.selector';

@Component({
    'selector': 'app-exercise',
    'templateUrl': './exercise.page.html',
    'styleUrls': ['./exercise.page.scss'],
})
export class ExercisePage implements OnInit {

    exercise$: Observable < any > ;

    constructor(
        public store: Store
    ) {}

    ngOnInit() {
        this.exercise$ = this.store.select(
            fromExercises.selectExerciseByRouteURL
        );
    }

}
