import { Component, Input } from '@angular/core';
import { Program } from 'src/app/core/state/program/program.state';

@Component({
    'selector': 'program-preview',
    'templateUrl': './program-preview.component.html',
    'styleUrls': ['./program-preview.component.scss'],
})
export class ProgramPreviewComponent {

    @Input() program: Program;

    constructor() {}

    getYoutubeThumbnail() {
        if (this.program && this.program.phases[0] && this.program.phases[0].schedule && this.program.phases[0].schedule.day1) {
            const workoutID = this.program.phases[0].schedule.day1;
            return `https://i3.ytimg.com/vi/${this.program.workouts[workoutID].exercises[0].youtubeID}/mqdefault.jpg`;
        }
    }
}
