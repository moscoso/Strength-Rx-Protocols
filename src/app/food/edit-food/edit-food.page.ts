import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/core/state/app.state';
import { UpdateRequested } from 'src/app/core/state/profile/profile.actions';

@Component({
  selector: 'app-edit-food',
  templateUrl: './edit-food.page.html',
  styleUrls: ['./edit-food.page.scss'],
})
export class EditFoodPage implements OnInit {

    constructor(
        public store: Store < AppState > ,
    ) {}

    ngOnInit() {}

    onSubmit(food: any) {
        this.store.dispatch(new UpdateRequested(food.id, food));
    }
}
