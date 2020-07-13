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
        if (this.program && this.program.schedule && this.program.schedule.day1) {
            return `https://i3.ytimg.com/vi/${this.program.schedule.day1.exercises[0].youtubeID}/mqdefault.jpg`;
        }
    }
}
