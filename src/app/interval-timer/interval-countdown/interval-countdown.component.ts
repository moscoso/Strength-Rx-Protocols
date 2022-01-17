import { Component, Input, ViewChild } from '@angular/core';
import { CountdownComponent } from 'ngx-countdown';
import { IntervalExerciseRoutine } from 'src/app/core/state/workout/workout.model';
import { YoutubePlayerComponent } from 'src/app/shared/youtube-player/youtube-player.component';

@Component({
    'selector': 'app-interval-countdown',
    'templateUrl': './interval-countdown.component.html',
    'styleUrls': ['./interval-countdown.component.scss'],
})
export class IntervalCountdownComponent {
    @ViewChild('cd', { 'static': false }) private countdown: CountdownComponent;
    @ViewChild('ytPlayer') ytPlayer: YoutubePlayerComponent ;
    config: {
        'leftTime': 0,
        'demand': false,
        'notify': [1],
    };

    @Input() listOfRoutines: IntervalExerciseRoutine[] = [];
    exerciseIndex = 0;

    status = 1;

    constructor() {}

    handleEvent(event) {
        this.status = event.status;
        console.log(event.action);
        switch (event.action) {
            case 'done':
                setTimeout(() => {
                    this.next();
                }, 200);
                break;
            case 'start':
            case 'restart':
                this.speak();
                break;
        }
    }

    begin() {
        if (this.countdown) {
            this.countdown.begin();
        }
    }

    pause() {
        if (this.countdown) {
            this.countdown.pause();
        }
    }

    resume() {
        if (this.countdown) {
            this.countdown.resume();
        }
    }

    stop() {
        if (this.countdown) {
            this.countdown.stop();
        }
    }

    prev() {
        this.exerciseIndex--;
        if (this.exerciseIndex < 0) { this.exerciseIndex = 0; }
        this.restart();
    }

    next() {
        this.exerciseIndex++;
        const noMoreExercises = this.exerciseIndex >= this.listOfRoutines.length;
        if (noMoreExercises) {
            this.stop();
        } else {
            this.restart();
        }

    }

    restart() {
        if (this.countdown) {
            this.countdown.restart();
            if (this.countdown.config.demand) {
                this.begin();
            }
        }
    }


    async speak() {
        if (window.speechSynthesis) {
            const exercise = this.listOfRoutines[this.exerciseIndex].exercise;
            const name = exercise ? exercise.name : 'rest';
            const nameWithoutDashes = name.replace(/-/g, ' ');

            const utterance = new SpeechSynthesisUtterance(nameWithoutDashes);
            window.speechSynthesis.cancel();
            window.speechSynthesis.speak(utterance);
        }
    }

    getYoutubeThumbnail(youtubeID) {
        if (youtubeID && youtubeID !== '') {
            return `https://i3.ytimg.com/vi/${youtubeID}/default.jpg`;
        } else {
            return `assets/icon/rest.png`;
        }
    }

}
