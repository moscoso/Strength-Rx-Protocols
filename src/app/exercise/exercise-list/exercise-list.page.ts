import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';

import { Store } from '@ngrx/store';
import { Observable, of , Subject, combineLatest } from 'rxjs';
import { take, filter, startWith } from 'rxjs/operators';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';


import Fuse from 'fuse.js';

import * as fromExercises from '../../core/state/exercises/exercises.selector';
import { AllRequested } from 'src/app/core/state/exercises/exercises.actions';
import { Exercise } from 'src/app/core/state/exercises/exercises.state';
import { AppState } from 'src/app/core/state/app.state';
import { CreateExerciseComponent } from '../create-exercise/create-exercise.component';

@UntilDestroy()
@Component({
    'selector': 'app-exercises',
    'templateUrl': './exercise-list.page.html',
    'styleUrls': ['./exercise-list.page.scss'],
})
export class ExerciseListPage implements OnInit {

    exercises$: Observable < Exercise[] > ;
    searchTerm$: Subject < string > = new Subject();
    exerciseList: Exercise[] = [];
    requestInProgress$: Observable < boolean > = of (false);


    constructor(
        public modalController: ModalController,
        public store: Store,
    ) {}

    ngOnInit(): void {
        this.initExerciseList();
    }

    async initExerciseList() {
        this.store.dispatch(new AllRequested());
        this.requestInProgress$ = this.store.select((state: AppState) => state.exercises.requestInProgress);
        this.exercises$ = this.store.select(fromExercises.selectAll);
        this.exercises$.pipe(untilDestroyed(this)).subscribe();
        combineLatest([this.exercises$, this.searchTerm$.pipe(startWith(''))]).subscribe(
            ([exercises, searchTerm]) => this.filterExercises([exercises, searchTerm])
        );
        this.exerciseList = await this.exercises$.pipe(filter(exercises => exercises.length > 0), take(1))
            .toPromise();
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
            'component': CreateExerciseComponent
        });
        await modal.present();
        return;
    }

    search(event) {
        const searchTerm = event.srcElement.value;
        this.searchTerm$.next(searchTerm);
    }

    private filterExercises([exercises, searchTerm]: [Exercise[], string]) {
        searchTerm = searchTerm.trim();

        if (searchTerm.length === 0) {
            this.exerciseList = exercises;
        } else {
            const options = {
                'includeScore': true,
                'keys': ['name', 'tags'],
                'shouldSort': true,
            };
            const searcher = new Fuse(exercises, options);
            const matches = searcher.search(searchTerm);
            this.exerciseList = matches.map(match => match.item);
        }
    }
}
