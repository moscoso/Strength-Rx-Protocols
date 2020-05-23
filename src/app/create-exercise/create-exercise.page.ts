import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { FormControl, Validators, FormGroup } from '@angular/forms';
import { Store } from '@ngrx/store';
import { CreateRequested } from '../core/state/exercises/exercises.actions';
import { Exercise } from '../core/state/exercises/exercises.state';
import { AppState } from '../core/state/app.state';
import { Observable } from 'rxjs';

@Component({
    'selector': 'app-create-exercise',
    'templateUrl': './create-exercise.page.html',
    'styleUrls': ['./create-exercise.page.scss'],
})
export class CreateExercisePage implements OnInit {

    /**
     * Regex for Youtube Video URLs: http://www.regexr.com/556et
     */
    private youtubeURLRegExp = '^(https?\:\/\/)?(www\.youtube\.com\/watch\?v\=|youtu\.be\/).{11,}$';

    name = new FormControl('', [Validators.required]);
    youtubeURL = new FormControl('', [Validators.required, Validators.pattern(this.youtubeURLRegExp)]);
    instructions = new FormControl('', []);

    form: FormGroup;

    requestInProgress$: Observable < boolean > ;

    constructor(
        public modalController: ModalController,
        public store: Store < AppState > ,
    ) {}

    ngOnInit() {
        this.form = new FormGroup({
            'name': this.name,
            'youtubeURL': this.youtubeURL,
            'instructions': this.instructions,
        });

        this.requestInProgress$ = this.store.select((state: AppState) => state.exercises.requestInProgress);
    }

    dismiss() {
        this.modalController.dismiss('create-exercise');
    }

    onSubmit(form) {
        const exercise: Exercise = {
            'id': form.name,
            'name': form.name,
            'youtubeID': this.scrapeIDfromYoutubeURL(form.youtubeURL),
            'instructions': form.instructions,
        };
        this.store.dispatch(new CreateRequested(exercise));
    }

    scrapeIDfromYoutubeURL(youtubeURL: string): string {
        const seperators = ['v=', '.be/'];
        for (const seperator of seperators) {
            if (youtubeURL.indexOf(seperator) > -1) {
                return youtubeURL.split(seperator).pop();
            }
        }
        throw Error('Failed to scrape ID. No seperator tokens found in the provided URL');
    }
}
