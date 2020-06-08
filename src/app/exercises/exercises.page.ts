import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { CreateExercisePage } from '../create-exercise/create-exercise.page';
import * as fromExercises from '../core/state/exercises/exercises.selector';
import { Store } from '@ngrx/store';
import { Observable, of , Subject, combineLatest } from 'rxjs';
import { Exercise } from '../core/state/exercises/exercises.state';
import { AllRequested } from '../core/state/exercises/exercises.actions';
import { AppState } from '../core/state/app.state';
import { take, filter, map, tap } from 'rxjs/operators';

@Component({
    'selector': 'app-exercises',
    'templateUrl': './exercises.page.html',
    'styleUrls': ['./exercises.page.scss'],
})
export class ExercisesPage implements OnInit {

    exercises$: Observable < Exercise[] >;
    searchTerm$: Subject < string >  = new Subject();
    exerciseList: Exercise[] = [];
    requestInProgress$: Observable < boolean > = of (false);

    constructor(
        public modalController: ModalController,
        public store: Store,
    ) {}

    ngOnInit(): void {
        this.initList();
    }

    async initList() {
        this.store.dispatch(new AllRequested());
        this.requestInProgress$ = this.store.select((state: AppState) => state.exercises.requestInProgress);
        this.exercises$ = this.store.select(fromExercises.selectAll);
        combineLatest([this.exercises$, this.searchTerm$]).subscribe(
            ([exercises, searchTerm]) => this.filterExercises([exercises, searchTerm])
        );
        this.exerciseList = await this.exercises$.pipe(filter(exercises => exercises.length > 0), take(1)).toPromise();
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

    search(event) {
        const searchTerm = event.srcElement.value;
        this.searchTerm$.next(searchTerm);
    }

    private filterExercises([exercises, searchTerm]: [Exercise[], string]) {
        this.exerciseList = exercises.filter(exercise => {
            if (!searchTerm || searchTerm.length === 0) { return true; }

            const strippedName = exercise.name.toLowerCase().replace('/\s/g', '');
            const strippedSearch = searchTerm.toLowerCase().replace('/\s/g', '');
            const matchFound = strippedName.indexOf(strippedSearch) > -1;
            return matchFound;
        });
    }
}
