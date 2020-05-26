import { Component, OnInit, Input } from '@angular/core';
import { Exercise } from 'src/app/core/state/exercises/exercises.state';

@Component({
    'selector': 'exercise-preview',
    'templateUrl': './exercise-preview.component.html',
    'styleUrls': ['./exercise-preview.component.scss'],
})
export class ExercisePreviewComponent implements OnInit {

    @Input() exercise: Exercise;

    constructor() {}

    ngOnInit() {}

}
