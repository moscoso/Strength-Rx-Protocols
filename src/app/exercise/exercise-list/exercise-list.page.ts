import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';

import { Observable, of , Subject, combineLatest } from 'rxjs';
import { first, startWith } from 'rxjs/operators';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';


import Fuse from 'fuse.js';

import { Exercise } from 'src/app/core/state/exercises/exercises.state';
import { CreateExerciseComponent } from '../create-exercise/create-exercise.component';
import { ExerciseStoreDispatcher } from 'src/app/core/state/exercises/exercises.dispatcher';

@UntilDestroy()
@Component({
    'selector': 'app-exercises',
    'templateUrl': './exercise-list.page.html',
    'styleUrls': ['./exercise-list.page.scss'],
})
export class ExerciseListPage implements OnInit {

    exercises$: Observable < Exercise[] > = of([]);
    searchTerm$: Subject < string > = new Subject();
    filteredExerciseList: Exercise[] = [];
    requestInProgress$: Observable < boolean > = of (false);


    constructor(
        public modalController: ModalController,
        public exerciseService: ExerciseStoreDispatcher,
    ) {}

    ngOnInit(): void {
        this.initExerciseList();
    }

    async initExerciseList() {
        this.exerciseService.loadAll();
        this.requestInProgress$ = this.exerciseService.selectRequestInProgress();
        this.exercises$ = this.exerciseService.selectAll();
        this.exercises$.pipe(untilDestroyed(this)).subscribe();
        combineLatest([this.exercises$, this.searchTerm$.pipe(startWith(''))]).subscribe(
            ([exercises, searchTerm]) => this.filterExercises([exercises, searchTerm])
        );
        this.filteredExerciseList = await this.exercises$.pipe(first(exercises => exercises.length > 0))
            .toPromise();
    }

    doRefresh(event): void {
        this.exerciseService.refreshAll();
        this.exerciseService.selectRequestInProgress().pipe(
            first(requestInProgress => requestInProgress === false),
        ).toPromise().then(() => {
            if (event && event.target && event.target.complete) { event.target.complete(); }
        });
    }

    async presentModal(): Promise < void > {
        const modal = await this.modalController.create({
            'id': 'create-exercise',
            'component': CreateExerciseComponent,
            'cssClass': 'modal-80-width'
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
            this.filteredExerciseList = exercises;
        } else {
            const options = {
                'includeScore': true,
                'keys': ['name', 'tags'],
                'shouldSort': true,
            };
            const searcher = new Fuse(exercises, options);
            const matches = searcher.search(searchTerm);
            this.filteredExerciseList = matches.map(match => match.item);
        }
    }
}
