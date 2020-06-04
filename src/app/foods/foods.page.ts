import { Component, OnInit } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Food } from '../core/state/food/food.state';
import { ModalController } from '@ionic/angular';
import { Store } from '@ngrx/store';
import { AllRequested } from '../core/state/food/food.actions';
import * as fromFoods from '../core/state/food/food.selector';
import { AppState } from '../core/state/app.state';
import { filter, take } from 'rxjs/operators';
import { CreateFoodPage } from '../create-food/create-food.page';

@Component({
    'selector': 'app-foods',
    'templateUrl': './foods.page.html',
    'styleUrls': ['./foods.page.scss'],
})
export class FoodsPage implements OnInit {

    foodList$: Observable < Food[] > = of ([]);

    requestInProgress$: Observable < boolean > = of (false);

    constructor(
        public modalController: ModalController,
        public store: Store,
    ) {}

    ngOnInit(): void {
        this.store.dispatch(new AllRequested());
        this.requestInProgress$ = this.store.select((state: AppState) => state.exercises.requestInProgress);
        this.foodList$ = this.store.select(fromFoods.selectAll);
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
            'id': 'create-food',
            'component': CreateFoodPage
        });
        await modal.present();
        return;
    }
}
