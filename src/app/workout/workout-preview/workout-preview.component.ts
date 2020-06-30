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

}
