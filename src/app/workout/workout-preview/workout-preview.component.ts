import { Component, OnInit, Input } from '@angular/core';
import { Exercise } from 'src/app/core/state/exercises/exercises.state';
import { Workout } from 'src/app/core/state/workouts/workouts.state';
import { StandardPhaseFormComponent } from '../workout-form/standard-phase-form/standard-phase-form.component';

@Component({
    'selector': 'workout-preview',
    'templateUrl': './workout-preview.component.html',
    'styleUrls': ['./workout-preview.component.scss'],
})
export class WorkoutPreviewComponent implements OnInit {

    @Input() workout: Workout;

    constructor() {}

    ngOnInit() {}

    getYoutubeThumbnail() {
        const exercise = this.extractExercise(this.workout);
        if (exercise && exercise.youtubeID) {
            return `https://i3.ytimg.com/vi/${exercise.youtubeID}/mqdefault.jpg`;
        }
    }

    extractExercise(workout: Workout): Exercise {
        const standardPhase = workout.standardPhase;
        const intervalPhase = workout.intervalPhase;
        if (standardPhase && standardPhase.exercises && standardPhase.exercises[0]) {
            return workout.standardPhase.exercises[0];
        } else if (intervalPhase &&
            intervalPhase.supersets &&
            intervalPhase.supersets[0] &&
            intervalPhase.supersets[0].exerciseRoutines &&
            intervalPhase.supersets[0].exerciseRoutines[0].exercise
        ) {
            return workout.intervalPhase.supersets[0].exerciseRoutines[0].exercise;
        } else {
            return null;
        }
    }
}
