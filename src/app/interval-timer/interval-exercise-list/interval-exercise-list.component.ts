import { Component, Input } from '@angular/core';
import { IntervalExerciseRoutine, IntervalPhase } from 'src/app/core/state/workout/workout.model';

@Component({
    'selector': 'app-interval-exercise-list',
    'templateUrl': './interval-exercise-list.component.html',
    'styleUrls': ['./interval-exercise-list.component.scss'],
})
export class IntervalExerciseListComponent {

    @Input() exercises: any[];

    @Input() intervalPhase: IntervalPhase;

    constructor() {}

    build(i: number, duration = 10, reps = 'AMRAP'): IntervalExerciseRoutine {
        return {
            'exercise': i == null ? null : this.exercises[i],
            'duration': duration,
            'reps': reps
        };
    }

    getYoutubeThumbnail(youtubeID) {
        if (youtubeID && youtubeID !== '') {
            return `https://i3.ytimg.com/vi/${youtubeID}/default.jpg`;
        } else {
            return `assets/icon/rest.png`;
        }
    }

    getColor(i: number) {
        return ['orange', 'green', 'blue', 'purple', 'pink'][i % 5];
    }

}
