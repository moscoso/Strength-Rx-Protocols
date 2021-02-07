import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { Observable, of , Subject, combineLatest } from 'rxjs';
import { startWith, first } from 'rxjs/operators';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { CreateWorkoutPage } from '../create-workout/create-workout.page';
import Fuse from 'fuse.js';
import { WorkoutFacade } from 'src/app/core/state/workout/workouts.facade';
import { Workout } from 'src/app/core/state/workout/workout.model';

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

    requestInProgress$ = of(false);

    constructor(
        public modalController: ModalController,
        public workoutService: WorkoutFacade,
        public changeDetector: ChangeDetectorRef
    ) {}

    ngOnInit(): void {
        this.initWorkoutList();
    }

    async initWorkoutList() {
        this.workoutService.loadAll();
        this.requestInProgress$ = this.workoutService.selectRequestInProgress();
        this.workouts$ = this.workoutService.selectAll();
        this.workouts$.pipe(untilDestroyed(this)).subscribe();
        combineLatest([this.workouts$, this.searchTerm$.pipe(startWith(''))]).subscribe(
            ([workouts, searchTerm]) => this.filterWorkouts([workouts, searchTerm])
        );
    }

    doRefresh(event): void {
        this.workoutService.loadAll();
        this.workoutService.selectRequestInProgress().pipe(
            first(requestInProgress => requestInProgress === false),
        ).toPromise().then(() => {
            event.target.complete();
        });
    }

    async presentModal(): Promise < void > {
        const modal = await this.modalController.create({
            'id': 'create-workout',
            'component': CreateWorkoutPage,
            'cssClass': 'modal-full'
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
