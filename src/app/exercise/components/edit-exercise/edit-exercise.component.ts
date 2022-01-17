import { Component } from '@angular/core';

import { ExerciseFacade } from 'src/app/core/state/exercise/exercise.facade';

@Component({
    'selector': 'app-edit-exercise',
    'templateUrl': './edit-exercise.component.html',
    'styleUrls': ['./edit-exercise.component.scss'],
})
export class EditExerciseComponent {
    constructor(
        public exerciseService: ExerciseFacade
    ) {}

    onSubmit(exercise: any) {
        this.exerciseService.update(exercise.id, exercise);
    }
}
