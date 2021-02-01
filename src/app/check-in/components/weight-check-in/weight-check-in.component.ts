import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { first } from 'rxjs/operators';
import { ClientStoreDispatcher } from 'src/app/core/state/client/client.dispatcher';
import { nonNull } from 'src/util/predicate/Predicates';
import { generateRandomID } from 'src/util/randomID/randomID';

@Component({
    selector: 'app-weight-check-in',
    templateUrl: './weight-check-in.component.html',
    styleUrls: ['./weight-check-in.component.scss'],
})
export class WeightCheckInComponent implements OnInit {

    form: FormGroup;
    date = new FormControl(new Date(), Validators.required);
    weight = new FormControl(100, Validators.required);

    constructor(
        private clientService: ClientStoreDispatcher,
        private firestore: AngularFirestore,
    ) {}

    ngOnInit() {
        this.form = new FormGroup({
            'date': this.date,
            'weight': this.weight,
        });
    }

    async onSubmit(form) {
        this.clientService.loadAll();
        const client = await this.clientService.selectUserAsClient().pipe(first(nonNull)).toPromise();

        const randomID = generateRandomID();
        const weightCheckIn = {
            'userID': client.id,
            'firstName': client.firstName,
            'lastName': client.lastName,
            'id': randomID,
            'timestamp': new Date(),
            'date': form.date,
            'weight': form.weight,
        };
        this.firestore.doc(`check-in-weights/${randomID}`).set(weightCheckIn);
    }

}
