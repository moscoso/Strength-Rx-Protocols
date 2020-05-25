import { Component, OnInit, Input } from '@angular/core';
import { Observable } from 'rxjs';
import { Exercise } from '../core/state/exercises/exercises.state';

@Component({
    'selector': 'exercise',
    'templateUrl': './exercise.component.html',
    'styleUrls': ['./exercise.component.scss'],
})
export class ExerciseComponent implements OnInit {

    @Input() exercise: Exercise;


    exercises$: Observable<any>;

    constructor(
        // public store: Store
    ) {}

    ngOnInit() {
        // this.exercises$ = this.store.select(
        //   getExerciseByID
        // );
    }

}
