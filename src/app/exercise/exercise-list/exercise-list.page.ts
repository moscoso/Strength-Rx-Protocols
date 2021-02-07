import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';

import { Observable, of , Subject, combineLatest } from 'rxjs';
import { first, startWith } from 'rxjs/operators';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';


import Fuse from 'fuse.js';

import { Exercise } from 'src/app/core/state/exercises/exercise.model';
import { CreateExerciseComponent } from '../components/create-exercise/create-exercise.component';
import { ExerciseFacade } from 'src/app/core/state/exercises/exercises.facade';
import { HighlightIndicesMap, removeIndicesThatAreTypos } from 'src/app/pipes/highlight-search.pipe';

@UntilDestroy()
@Component({
    'selector': 'app-exercises',
    'templateUrl': './exercise-list.page.html',
    'styleUrls': ['./exercise-list.page.scss'],
})
export class ExerciseListPage implements OnInit {

    exercises$: Observable < Exercise[] > = of ([]);
    searchTerm$: Subject < string > = new Subject();
    filteredExerciseList: Exercise[] = [];
    highlights: HighlightIndicesMap = {};
    requestInProgress$: Observable < boolean > = of (false);
    loading = true;

    constructor(
        public modalController: ModalController,
        public exerciseService: ExerciseFacade,
    ) {}

    ngOnInit(): void {
        this.initExerciseList();
    }

    async initExerciseList() {
        this.exerciseService.loadAll();
        this.requestInProgress$ = this.exerciseService.selectRequestInProgress();
        this.exerciseService.whenRequestCompletes().then(() => { this.loading = false; });
        this.exercises$ = this.exerciseService.selectAll();
        this.exercises$.pipe(untilDestroyed(this)).subscribe();
        combineLatest([this.exercises$, this.searchTerm$.pipe(startWith(''))]).subscribe(
            ([exercises, searchTerm]) => this.filterExercises([exercises, searchTerm])
        );
        this.filteredExerciseList = await this.exercises$.pipe(first(exercises => exercises.length > 0))
            .toPromise();
    }

    refresh(): void {
        this.exerciseService.refreshAll();
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
            this.highlights = {};
        } else {
            const options = {
                'includeScore': true,
                'ignoreLocation': false,
                'keys': ['name'],
                'shouldSort': true,
                'minMatchCharLength': 3,
                'includeMatches': true,
            };
            const searcher = new Fuse(exercises, options);
            const matches: Fuse.FuseResult < Exercise > [] = searcher.search(searchTerm);
            this.highlights = this.generateHighlightIndices(matches, searchTerm);
            this.filteredExerciseList = matches.map(match => match.item);
        }
    }

    private generateHighlightIndices(searchResults: Fuse.FuseResult < Exercise > [], searchTerm: string): HighlightIndicesMap {
        const highlights: HighlightIndicesMap = {};
        searchResults.forEach(result => {
            const exerciseID = result.item.id;
            const resultHasMatch = result.matches.length > 0;
            if (resultHasMatch) {
                const indices = result.matches[0].indices;
                highlights[exerciseID] = removeIndicesThatAreTypos(indices, result.item.name, searchTerm);
            }
        });
        return highlights;
    }
}
