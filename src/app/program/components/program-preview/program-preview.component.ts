import { Component, Input } from '@angular/core';
import { Exercise } from 'src/app/core/state/exercise/exercise.model';
import { Program } from 'src/app/core/state/program/program.model';

@Component({
    'selector': 'program-preview',
    'templateUrl': './program-preview.component.html',
    'styleUrls': ['./program-preview.component.scss'],
})
export class ProgramPreviewComponent {

    @Input() program: Program;

    constructor() {}

    getYoutubeThumbnail() {
        const exercise = this.extractExercise(this.program);
        if (exercise && exercise.youtubeID) {
            return `https://i3.ytimg.com/vi/${exercise.youtubeID}/mqdefault.jpg`;
        }
    }

    extractExercise(program: Program): Exercise {
        if (program && program.phases && program.phases[0] && program.phases[0].schedule && program.phases[0].schedule.day1) {
            const firstWorkout = program.phases[0].schedule.day1;
            const standardPhase = firstWorkout.standardPhase;
            const intervalPhase = firstWorkout.intervalPhase;
            if (standardPhase && standardPhase.exercises && standardPhase.exercises[0]) {
                return firstWorkout.standardPhase.exercises[0];
            } else if (intervalPhase &&
                intervalPhase.supersets &&
                intervalPhase.supersets[0] &&
                intervalPhase.supersets[0].exerciseRoutines &&
                intervalPhase.supersets[0].exerciseRoutines[0].exercise
            ) {
                return firstWorkout.intervalPhase.supersets[0].exerciseRoutines[0].exercise;
            }
        } else {
            return null;
        }

    }
}
