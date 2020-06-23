import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { FormControl, Validators, FormGroup, AbstractControl, ValidationErrors } from '@angular/forms';
import { Observable } from 'rxjs';
import { CreateRequested } from 'src/app/core/state/food/food.actions';
import { AppState } from 'src/app/core/state/app.state';
import { Food } from 'src/app/core/state/food/food.state';
import { Store } from '@ngrx/store';
import { AngularFirestore } from '@angular/fire/firestore';
import { validateDocIDIsUnique } from 'src/util/verifyDocIsUnique/verifyDocIsUnique';

@Component({
    selector: 'food-form',
    templateUrl: './food-form.component.html',
    styleUrls: ['./food-form.component.scss'],
})
export class FoodFormComponent implements OnInit {

    @Input() buttonText = 'Submit';
    @Output() formSubmit = new EventEmitter < Partial < Food >> ();

    name = new FormControl('', [Validators.required], this.verifyFoodIsUnique.bind(this));
    calories = new FormControl('', [Validators.required, Validators.min(0)]);
    carbs = new FormControl('', [Validators.required, Validators.min(0)]);
    fats = new FormControl('', [Validators.required, Validators.min(0)]);
    protein = new FormControl('', [Validators.required, Validators.min(0)]);
    photoFile = new FormControl();

    form: FormGroup;

    requestInProgress$: Observable < boolean > ;

    constructor(
        public store: Store < AppState > ,
        public firestore: AngularFirestore,
    ) { }

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

    initFormValues(food: Food) {
        this.name.setValue(food.name);
        this.name.disable();
        this.calories.setValue(food.calories);
        this.carbs.setValue(food.carbs);
        this.fats.setValue(food.fats);
        this.protein.setValue(food.protein);
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

    getSlug(name: string) {
        return name.trim().replace(/\s+/g, '-').toLowerCase();
    }

    verifyFoodIsUnique(ctrl: AbstractControl): Promise < ValidationErrors | null > {
        return validateDocIDIsUnique(`foods`, ctrl, this.firestore);
    }
}
