import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { Store } from '@ngrx/store';
import { Observable, of , Subject, combineLatest } from 'rxjs';
import { take, filter, startWith } from 'rxjs/operators';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';


import { AppState } from 'src/app/core/state/app.state';
import { Workout } from 'src/app/core/state/workouts/workouts.state';
import * as fromWorkouts from 'src/app/core/state/workouts/workouts.selector';
import { AllRequested } from 'src/app/core/state/workouts/workouts.actions';
import { CreateWorkoutPage } from '../create-workout/create-workout.page';
import Fuse from 'fuse.js';

@UntilDestroy()
@Component({
    'selector': 'workout-list',
    'templateUrl': './workout-list.page.html',
    'styleUrls': ['./workout-list.page.scss'],
})
export class WorkoutListPage implements OnInit {

    workouts$: Observable < Workout[] > = of ([]);
    searchTerm$: Subject < string > = new Subject();
    workoutList: Workout[] = [];
    requestInProgress$: Observable < boolean > = of (false);

    constructor(
        public modalController: ModalController,
        public store: Store,
    ) {}

    ngOnInit(): void {
        this.initWorkoutList();
    }

    async initWorkoutList() {
        this.store.dispatch(new AllRequested());
        this.requestInProgress$ = this.store.select((state: AppState) => state.workouts.requestInProgress);
        this.workouts$ = this.store.select(fromWorkouts.selectAll);
        this.workouts$.pipe(untilDestroyed(this)).subscribe();
        combineLatest([this.workouts$, this.searchTerm$.pipe(startWith(''))]).subscribe(
            ([workouts, searchTerm]) => this.filterWorkouts([workouts, searchTerm])
        );
    }

    doRefresh(event): void {
        this.store.dispatch(new AllRequested());
        this.store.select((state: AppState) => state.workouts.requestInProgress).pipe(
            filter(requestInProgress => requestInProgress === false),
            take(1),
        ).toPromise().then(() => {
            event.target.complete();
        });
    }

    async presentModal(): Promise < void > {
        const modal = await this.modalController.create({
            'id': 'create-workout',
            'component': CreateWorkoutPage
        });
        await modal.present();
        return;
    }

    search(event) {
        const searchTerm = event.srcElement.value;
        this.searchTerm$.next(searchTerm);
    }

    private filterWorkouts([workouts, searchTerm]: [Workout[], string]) {
        searchTerm = searchTerm.trim();

        if (searchTerm.length === 0) {
            this.workoutList = workouts;
        } else {
            const options = {
                'includeScore': true,
                'keys': ['name', 'tags'],
                'shouldSort': true,
            };
            const searcher = new Fuse(workouts, options);
            const matches = searcher.search(searchTerm);
            this.workoutList = matches.map(match => match.item);
        }
    }

}
