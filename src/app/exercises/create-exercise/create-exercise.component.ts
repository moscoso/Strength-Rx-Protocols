import { Component, OnInit } from '@angular/core';
import { CreateRequested } from 'src/app/core/state/exercises/exercises.actions';
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/core/state/app.state';

@Component({
    'selector': 'app-create-exercise',
    'templateUrl': './create-exercise.component.html',
    'styleUrls': ['./create-exercise.component.scss'],
})
export class CreateExerciseComponent implements OnInit {

    constructor(
        public store: Store < AppState > ,
    ) {}

    ngOnInit() {}

    onSubmit(exercise: any) {
        this.store.dispatch(new CreateRequested(exercise));
    }

}
