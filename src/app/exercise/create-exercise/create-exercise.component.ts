import { Component, OnInit } from '@angular/core';
import { ExerciseStoreDispatcher } from 'src/app/core/state/exercises/exercises.dispatcher';

@Component({
    'selector': 'app-create-exercise',
    'templateUrl': './create-exercise.component.html',
    'styleUrls': ['./create-exercise.component.scss'],
})
export class CreateExerciseComponent implements OnInit {

    constructor(
        public exerciseService: ExerciseStoreDispatcher
    ) {}

    ngOnInit() {}

    onSubmit(exercise: any) {
        this.exerciseService.create(exercise);
    }

}
