import { Component, OnInit } from '@angular/core';
import { ExerciseFacade } from 'src/app/core/state/exercise/exercise.facade';

@Component({
    'selector': 'app-create-exercise',
    'templateUrl': './create-exercise.component.html',
    'styleUrls': ['./create-exercise.component.scss'],
})
export class CreateExerciseComponent {

    constructor(
        public exerciseService: ExerciseFacade
    ) {}

    onSubmit(exercise: any) {
        this.exerciseService.create(exercise);
    }

}
