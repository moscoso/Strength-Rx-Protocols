import { Component, OnInit } from '@angular/core';
import { Observable, of, from } from 'rxjs';
import { Food } from 'src/app/core/state/food/food.state';
import { AllRequested, DeleteRequested } from 'src/app/core/state/food/food.actions';
import { selectUserIsTrainer } from 'src/app/core/state/profile/profile.selector';
import * as fromFoods from 'src/app/core/state/food/food.selector';
import { AppState } from 'src/app/core/state/app.state';
import { filter, take } from 'rxjs/operators';
import { Store } from '@ngrx/store';
import { ModalController, ActionSheetController } from '@ionic/angular';
@Component({
    'selector': 'app-food',
    'templateUrl': './food.page.html',
    'styleUrls': ['./food.page.scss'],
})
export class FoodPage implements OnInit {

    food$: Observable < Food >;
    isTrainer$: Observable < boolean > = of(false) ;

    constructor(
        public store: Store,
        public modalCtrl: ModalController,
        public actionSheetCtrl: ActionSheetController,
    ) {}

    ngOnInit() {
        this.store.dispatch(new AllRequested());
        this.food$ = this.store.select(
            fromFoods.selectFoodByRouteURL
        );
        this.isTrainer$ = this.store.select(
            selectUserIsTrainer
        );
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

    // requestEdit(): void {

    // }

    async showActionSheetToDelete(): Promise < void > {
        const actionSheet = await this.actionSheetCtrl.create({
            'id': 'exerciseDelete',
            'header': 'Are you sure you want to delete?',
            'buttons': [
            {
                'text': 'Delete',
                'role': 'destructive',
                'icon': 'trash',
                'handler': () => {this.requestDelete(); }
            }, {
                'text': 'Cancel',
                'role': 'cancel'
            }],
        });
        actionSheet.present();
    }

    async requestDelete(): Promise < void > {
        const food = await this.food$.pipe(take(1)).toPromise();
        this.store.dispatch(new DeleteRequested(food.id));
    }
}
