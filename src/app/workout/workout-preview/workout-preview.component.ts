import { Component, OnInit, Input } from '@angular/core';
import { Workout } from 'src/app/core/state/workouts/workouts.state';

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
        return `https://i3.ytimg.com/vi/${this.workout.standardPhase.exercises[0].youtubeID}/mqdefault.jpg`;
    }
}
