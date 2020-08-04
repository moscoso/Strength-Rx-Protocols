import { Component, OnInit, Input } from '@angular/core';
import { Exercise } from 'src/app/core/state/exercises/exercises.state';
import { HighlightIndices } from 'src/app/pipes/highlight-search.pipe';

@Component({
    'selector': 'exercise-preview',
    'templateUrl': './exercise-preview.component.html',
    'styleUrls': ['./exercise-preview.component.scss'],
})
export class ExercisePreviewComponent implements OnInit {

    @Input() exercise: Exercise;
    @Input() notes: string;
    @Input() highlights: HighlightIndices;

    constructor() {}

    ngOnInit() {}


    getYoutubeThumbnail() {
        return `https://i3.ytimg.com/vi/${this.exercise.youtubeID}/mqdefault.jpg`;
    }
}
