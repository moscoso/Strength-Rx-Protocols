import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Store } from '@ngrx/store';
import * as fromExercises from '../../core/state/exercises/exercises.selector';
import { AllRequested } from 'src/app/core/state/exercises/exercises.actions';
import { filter, take } from 'rxjs/operators';
import { AppState } from 'src/app/core/state/app.state';

@Component({
    'selector': 'app-exercise',
    'templateUrl': './exercise.page.html',
    'styleUrls': ['./exercise.page.scss'],
})
export class ExercisePage implements OnInit {

    exercise$: Observable < any > ;

    constructor(
        public store: Store
    ) {}

    ngOnInit() {
        this.store.dispatch(new AllRequested());
        this.exercise$ = this.store.select(
            fromExercises.selectExerciseByRouteURL
        );
        this.exercise$.subscribe(x => console.log(x));
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

}
