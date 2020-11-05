import { AfterViewInit, Component, OnInit, SimpleChanges, ViewChild } from '@angular/core';
import { CountdownComponent } from 'ngx-countdown';
import { Observable } from 'rxjs';
import { first } from 'rxjs/operators';
import { ExerciseStoreDispatcher } from '../core/state/exercises/exercises.dispatcher';
import { Exercise } from '../core/state/exercises/exercises.state';

@Component({
    'selector': 'app-interval-timer',
    'templateUrl': './interval-timer.page.html',
    'styleUrls': ['./interval-timer.page.scss'],
})
export class IntervalTimerPage implements OnInit, AfterViewInit {
    @ViewChild('cd', { 'static': false }) private countdown: CountdownComponent;
    config: {
        'leftTime': 30,
        'demand': false,
        'notify': [1],
    };

    exerciseIndex = 0;
    exercises$: Observable < Exercise[] > ;

    constructor(
        public exerciseService: ExerciseStoreDispatcher,
    ) {
        this.exerciseService.loadAll();
        this.exercises$ = this.exerciseService.selectAll().pipe(first(x => x.length > 0));

        this.exercises$.toPromise().then(x => console.log(x));
    }

    ngOnInit() {

    }

    ngAfterViewInit() {
        console.log(this.countdown);
    }

    handleEvent(event) {
        console.log(event);
        switch (event.action) {
            case 'done':
                this.exerciseIndex++;
                setTimeout(() => {
                    this.restart();
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
        this.restart();
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
        const exercises = await this.exercises$.pipe(first()).toPromise();
        if (window.speechSynthesis) {
            const name = exercises[this.exerciseIndex].name;
            const nameWithoutDashes = name.replace(/-/g, ' ');

            const utterance = new SpeechSynthesisUtterance(nameWithoutDashes);
            window.speechSynthesis.cancel();
            window.speechSynthesis.speak(utterance);

        }
    }

}
