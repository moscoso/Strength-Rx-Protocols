import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';
import { FormControl, Validators, FormGroup, AbstractControl, ValidationErrors } from '@angular/forms';
import { Observable, of } from 'rxjs';
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/core/state/app.state';
import { Exercise } from 'src/app/core/state/exercises/exercises.state';
import { ToastService } from 'src/app/shared/toast/toast.service';
import { selectExerciseByRouteURL } from 'src/app/core/state/exercises/exercises.selector';
import { first } from 'rxjs/operators';
import { validateExerciseIsUnique } from 'src/util/validateDocumentIsUnique/validateDocumentIsUnique';

@Component({
    'selector': 'exercise-form',
    'templateUrl': './exercise-form.component.html',
    'styleUrls': ['./exercise-form.component.scss'],
})
export class ExerciseFormComponent implements OnInit {

    @Input() buttonText = 'Submit';
    @Output() formSubmit = new EventEmitter < Partial < Exercise >> ();

    /**
     * Regex for Youtube Video URLs: http://www.regexr.com/556et
     */
    private youtubeURLRegExp = new RegExp('^(https?\:\/\/)?(www\.youtube\.com|youtu\.?be)\/.+$');

    name = new FormControl('', {
        'updateOn': 'blur',
        'validators': Validators.required,
        'asyncValidators': validateExerciseIsUnique.bind(this)
    });
    youtubeURL = new FormControl('', [Validators.required, Validators.pattern(this.youtubeURLRegExp)]);
    instructions = new FormControl('', []);
    form: FormGroup;

    requestInProgress$: Observable < boolean > = of (false);

    constructor(
        public store: Store,
        public toastService: ToastService
    ) {}

    ngOnInit() {
        this.form = new FormGroup({
            'name': this.name,
            'youtubeURL': this.youtubeURL,
            'instructions': this.instructions,
        });
        this.requestInProgress$ = this.store.select((state: AppState) => state.exercises.requestInProgress);
        this.store.select(selectExerciseByRouteURL).pipe(first()).toPromise().then(exercise => {
            if (exercise) {
                this.initFormValues(exercise);
            }
        });
    }

    initFormValues(exercise: Exercise) {
        this.name.setValue(exercise.name);
        this.name.disable();
        this.instructions.setValue(exercise.instructions);
        this.youtubeURL.setValue(`https://youtu.be/${exercise.youtubeID}`);
        this.youtubeURL.markAsDirty();
    }

    onSubmit(form) {
        try {
            const youtubeID = this.scrapeIDfromYoutubeURL(form.youtubeURL);
            let values: Partial < Exercise > ;
            values = {
                'id': this.getSlug(form.name),
                'name': form.name,
                'youtubeID': youtubeID,
                'instructions': form.instructions
            };
            this.formSubmit.emit(values);
        } catch (error) {
            this.toastService.failed(`Could not submit exercise`, error);
        }
    }

    scrapeIDfromYoutubeURL(youtubeURL: string): string {
        const seperators = ['v=', '.be/'];
        for (const seperator of seperators) {
            if (youtubeURL.indexOf(seperator) > -1) {
                const youtubeID = youtubeURL.split(seperator).pop();
                if (youtubeID.length !== 11) {
                    const errorMessage =
                        `Invalid youtube ID. Press the 'Share' button on youtube then copy and paste that link.`;
                    throw Error(errorMessage);
                }
                return youtubeID;
            }
        }
        throw Error ('Failed to scrape ID. No seperator tokens found in the provided URL');
    }

    getSlug(name: string) {
        return name.trim().replace(/\s+/g, '-').toLowerCase();
    }
}
