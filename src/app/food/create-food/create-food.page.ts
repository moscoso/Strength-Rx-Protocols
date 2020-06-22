import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/core/state/app.state';
import { CreateRequested } from 'src/app/core/state/food/food.actions';


@Component({
    'selector': 'app-create-food',
    'templateUrl': './create-food.page.html',
    'styleUrls': ['./create-food.page.scss'],
})
export class CreateFoodPage implements OnInit {

    requestInProgress$: Observable < boolean > ;

    constructor(
        public store: Store < AppState > ,
    ) {}

    ngOnInit() {}

    onSubmit(food: any) {
        this.store.dispatch(new CreateRequested(food));
    }

}
