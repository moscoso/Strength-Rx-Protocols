import { Component, OnInit } from '@angular/core';

import { ExerciseStoreDispatcher } from 'src/app/core/state/exercises/exercises.dispatcher';

@Component({
    'selector': 'app-edit-exercise',
    'templateUrl': './edit-exercise.component.html',
    'styleUrls': ['./edit-exercise.component.scss'],
})
export class EditExerciseComponent implements OnInit {
    constructor(
        public exerciseService: ExerciseStoreDispatcher
    ) {}

    ngOnInit() {}

    onSubmit(exercise: any) {
        this.exerciseService.update(exercise.id, exercise);
    }
}
