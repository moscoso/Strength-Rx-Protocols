import { Component, Input, OnInit } from '@angular/core';
import { StandardExerciseRoutine, Workout } from 'src/app/core/state/workouts/workouts.state';

@Component({
    'selector': 'app-workout-info',
    'templateUrl': './workout-info.component.html',
    'styleUrls': ['./workout-info.component.scss'],
})
export class WorkoutInfoComponent implements OnInit {

    @Input() workout: Workout;

    constructor() {}

    ngOnInit() {}

    getNotes(routine: StandardExerciseRoutine) {
        if (!routine) { console.warn('getNotes failed because routine is undefined'); return; }

        let note = '';
        if (routine.sets) { note += `Sets: ${routine.sets} `; }
        if (routine.reps) { note += `Reps: ${routine.reps} `; }
        if (routine.percentageOfOneRepMax) { note += `%1RM: ${routine.percentageOfOneRepMax} `; }
        if (routine.rateOfPerceivedExertion) { note += `RPE: ${routine.rateOfPerceivedExertion} `; }
        if (routine.tempo) { note += `Tempo: ${routine.rateOfPerceivedExertion} `; }
        if (routine.rest) { note += `Rest: ${routine.rateOfPerceivedExertion} `; }

        return note;
    }

}
