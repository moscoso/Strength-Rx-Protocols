import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { CreateExercisePage } from '../create-exercise/create-exercise.page';
import * as fromExercises from '../core/state/exercises/exercises.selector';
import { Store } from '@ngrx/store';
import { Observable, of } from 'rxjs';
import { Exercise } from '../core/state/exercises/exercises.state';
import { AllRequested } from '../core/state/exercises/exercises.actions';
import { AppState } from '../core/state/app.state';
import { take, filter, map } from 'rxjs/operators';

@Component({
    'selector': 'app-exercises',
    'templateUrl': './exercises.page.html',
    'styleUrls': ['./exercises.page.scss'],
})
export class ExercisesPage implements OnInit {

    exercises$: Observable < Exercise[] > = of ([]);
    filteredList: Exercise[] = [];

    searchTerm: string;

    requestInProgress$: Observable < boolean > = of (false);

    constructor(
        public modalController: ModalController,
        public store: Store,
    ) {}

    ngOnInit(): void {
        this.store.dispatch(new AllRequested());
        this.requestInProgress$ = this.store.select((state: AppState) => state.exercises.requestInProgress);
        this.exercises$ = this.store.select(fromExercises.selectAll);
    }

    doRefresh(event): void {
        this.store.dispatch(new AllRequested());
        this.store.select((state: AppState) => state.exercises.requestInProgress).pipe(
            filter(requestInProgress => requestInProgress === false),
            take(1),
        ).toPromise().then(() => {
            event.target.complete();
        });
    }

    async presentModal(): Promise < void > {
        const modal = await this.modalController.create({
            'id': 'create-exercise',
            'component': CreateExercisePage
        });
        await modal.present();
        return;
    }

    async filterList(event) {
        const searchTerm = event.srcElement.value;
        this.searchTerm = searchTerm;
        console.log(searchTerm);
        if (!searchTerm) {
            return;
        }
        this.filteredList = await this.exercises$.pipe(
            map(exercises => {
                return exercises.filter(exercise => {
                    const strippedName = exercise.name.toLowerCase().replace('/\s/g', '');
                    const strippedSearch = this.searchTerm.toLowerCase().replace('/\s/g', '');
                    return true;
                });
            }),
            take(1)
        ).toPromise();
    }
}
