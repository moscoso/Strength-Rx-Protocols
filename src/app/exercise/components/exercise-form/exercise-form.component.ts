import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';
import { FormControl, Validators, FormGroup, AbstractControl, ValidationErrors } from '@angular/forms';
import { Observable, of } from 'rxjs';
import { Exercise } from 'src/app/core/state/exercises/exercises.state';
import { ToastService } from 'src/app/shared/toast/toast.service';
import { first } from 'rxjs/operators';
import { transformToSlug } from 'src/util/slug/transformToSlug';
import { AngularFirestore } from '@angular/fire/firestore';
import { validateDocIDIsUnique } from 'src/util/verifyDocIsUnique/verifyDocIsUnique';
import { ExerciseStoreDispatcher } from 'src/app/core/state/exercises/exercises.dispatcher';
import { Delta } from 'src/util/delta/Delta';

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
        'asyncValidators': this.verifyExerciseIsUnique.bind(this)
    });
    youtubeURL = new FormControl('', [Validators.required, Validators.pattern(this.youtubeURLRegExp)]);
    instructions = new FormControl('', []);
    form: FormGroup;

    requestInProgress$: Observable < boolean > = of (false);

    alternateIDs = new FormControl([], []);
    exerciseList$: Observable < Exercise[] > = of ([]);

    defaultValue: Exercise;


    constructor(
        public exerciseService: ExerciseStoreDispatcher,
        public toastService: ToastService,
        public firestore: AngularFirestore,
    ) {}

    ngOnInit() {
        this.exerciseService.loadAll();
        this.form = new FormGroup({
            'name': this.name,
            'youtubeURL': this.youtubeURL,
            'instructions': this.instructions,
            'alternateIDs': this.alternateIDs,
        });
        this.requestInProgress$ = this.exerciseService.selectRequestInProgress();
        this.exerciseService.selectExerciseByRouteURL().pipe(first(exercise => exercise != null)).toPromise()
            .then(this.initFormValues.bind(this));
        this.exerciseList$ = this.exerciseService.selectAll();
    }

    initFormValues(exercise: Exercise) {
        this.defaultValue = exercise;
        this.name.setValue(exercise.name);
        this.instructions.setValue(exercise.instructions);
        this.youtubeURL.setValue(`https://youtu.be/${exercise.youtubeID}`);
        this.youtubeURL.markAsDirty();
        this.alternateIDs.setValue(exercise.alternateIDs);
    }

    onSubmit(form) {
        try {
            const values = this.createExerciseFromForm();
            if  (this.defaultValue === undefined ) {
                this.formSubmit.emit(values);
             } else {
                const changes = {...Delta.object(this.defaultValue, values), 'id': this.defaultValue.id};
                this.formSubmit.emit(changes);
            }
        } catch (error) {
            this.toastService.failed(`Could not submit exercise`, error);
        }
    }

    scrapeIDfromYoutubeURL(youtubeURL: string): string {
        const seperators = ['v=', '.be/'];
        for (const seperator of seperators) {
            const hasSeperator = youtubeURL.indexOf(seperator) > -1;
            if (hasSeperator) {
                const youtubeID = youtubeURL.split(seperator).pop();
                if (youtubeID.length !== 11) {
                    const errorMessage =
                        `Invalid youtube ID. Press the 'Share' button on youtube then copy and paste that link.`;
                    throw Error(errorMessage);
                }
                return youtubeID;
            }
        }
        throw Error('Failed to scrape ID. No seperator tokens found in the provided URL');
    }

    getSlug(name: string) {
        return transformToSlug(name);
    }

    verifyExerciseIsUnique(ctrl: AbstractControl): Promise < ValidationErrors | null > {
        return validateDocIDIsUnique(`exercises`, ctrl, this.firestore);
    }

    nameHasChanged() {
        return this.defaultValue !== undefined && this.defaultValue.name !== this.name.value;
    }

    createExerciseFromForm() {
        const exercise: Exercise = this.form.getRawValue();
        const youtubeID = this.scrapeIDfromYoutubeURL(this.youtubeURL.value);
        let values: Partial < Exercise > ;
        values = {
            'id': this.getSlug(exercise.name),
            'name': exercise.name,
            'youtubeID': youtubeID,
            'instructions': exercise.instructions,
            'alternateIDs': exercise.alternateIDs
        };
        return values;
    }

    /**
     * A function to compare the option values with the selected values.
     * @param e1 the first argument is a value from an option.
     * @param e2 the second is a value from the selection.
     * @returns a boolean should be returned.
     */

    compareExerciseIDs(e1: string, e2: string): boolean {
        return e1 === e2;
    }
}
