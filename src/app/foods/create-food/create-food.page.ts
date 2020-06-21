import { Component, OnInit } from '@angular/core';
import { FormControl, Validators, FormGroup, AbstractControl, ValidationErrors } from '@angular/forms';
import { Observable } from 'rxjs';
import { ModalController } from '@ionic/angular';
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/core/state/app.state';
import { AngularFirestore } from '@angular/fire/firestore';
import { Food } from 'src/app/core/state/food/food.state';
import { CreateRequested } from 'src/app/core/state/food/food.actions';


@Component({
    'selector': 'app-create-food',
    'templateUrl': './create-food.page.html',
    'styleUrls': ['./create-food.page.scss'],
})
export class CreateFoodPage implements OnInit {

    name = new FormControl('', [Validators.required], this.validateDocIDIsUnique
        .bind(this));
    calories = new FormControl('', [Validators.required, Validators.min(0)]);
    carbs = new FormControl('', [Validators.required, Validators.min(0)]);
    fats = new FormControl('', [Validators.required, Validators.min(0)]);
    protein = new FormControl('', [Validators.required, Validators.min(0)]);
    photoFile = new FormControl();

    form: FormGroup;

    requestInProgress$: Observable < boolean > ;

    constructor(
        public modalController: ModalController,
        public store: Store < AppState > ,
        public firestore: AngularFirestore,
    ) {}

    ngOnInit() {
        this.form = new FormGroup({
            'name': this.name,
            'calories': this.calories,
            'carbs': this.carbs,
            'fats': this.fats,
            'protein': this.protein,
        });
        this.requestInProgress$ = this.store.select((state: AppState) => state.foods.requestInProgress);
    }

    dismiss() {
        this.modalController.dismiss('create-food');
    }

    onSubmit(form) {
        const food: Food = {
            'id': this.getSlug(form.name),
            'name': form.name.trim(),
            'calories': form.calories,
            'carbs': form.carbs,
            'fats': form.fats,
            'protein': form.protein,
            'photoURL': '',
            'dateCreated': new Date(),
        };
        this.store.dispatch(new CreateRequested(food));
    }

    /**
     * Validate that the document ID for exercises does not already exist!
     */
    // TODO: Optimize with debounce:
    // https://stackoverflow.com/questions/36919011/how-to-add-debounce-time-to-an-async-validator-in-angular-2
    async validateDocIDIsUnique(ctrl: AbstractControl): Promise < ValidationErrors | null > {
        return this.firestore.doc(`foods/${ctrl.value}`).ref.get({
            'source': 'server',
        }).then(doc => doc.exists ? { 'entityIDTaken': true } : null).catch(reason =>
    ({ 'couldNotReachServer': reason }));
    }

    getSlug(name: string) {
        return name.trim().replace(/\s+/g, '-').toLowerCase();
    }

}
