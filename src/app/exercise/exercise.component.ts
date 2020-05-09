import { Component, OnInit, Input } from '@angular/core';

@Component({
    'selector': 'exercise',
    'templateUrl': './exercise.component.html',
    'styleUrls': ['./exercise.component.scss'],
})
export class ExerciseComponent implements OnInit {

    @Input() name: string;
    @Input() videoURL = 'https://www.youtube.com/embed/IODxDxX7oi4';
    @Input() instructions: string;

    constructor() {}

    ngOnInit() {}

}
