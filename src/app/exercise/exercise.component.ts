import { Component, OnInit, Input } from '@angular/core';
import { Observable } from 'rxjs';
import { Store } from '@ngrx/store';

@Component({
    'selector': 'exercise',
    'templateUrl': './exercise.component.html',
    'styleUrls': ['./exercise.component.scss'],
})
export class ExerciseComponent implements OnInit {

    @Input() name: string;
    @Input() videoURL = 'https://www.youtube.com/embed/IODxDxX7oi4';
    @Input() instructions: string;

    exercises$: Observable<any>;

    constructor(public store: Store) {}

    ngOnInit() {
        // this.exercises$ = this.store.select(
        //   getExerciseByID
        // );
    }

}
