import { Component, Input } from '@angular/core';
import { StandardExerciseRoutine, Workout } from 'src/app/core/state/workout/workout.model';

@Component({
    'selector': 'app-workout-info',
    'templateUrl': './workout-info.component.html',
    'styleUrls': ['./workout-info.component.scss'],
})
export class WorkoutInfoComponent {

    @Input() workout: Workout;

    constructor() {}

    getNotes(routine: StandardExerciseRoutine) {
        if (!routine) { console.warn('getNotes failed because routine is undefined'); return; }

        let note = '';
        if (routine.sets) { note += `Sets: ${routine.sets} `; }
        if (routine.reps) { note += `Reps: ${routine.reps} `; }
        if (routine['%1rm']) { note += `%1RM: ${routine['%1rm']} `; }
        if (routine.rpe) { note += `RPE: ${routine.rpe} `; }
        if (routine.tempo) { note += `Tempo: ${routine.tempo} `; }
        if (routine.rest) { note += `Rest: ${routine.rest} `; }

        return note;
    }

}
