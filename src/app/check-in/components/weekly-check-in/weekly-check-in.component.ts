import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { first, map } from 'rxjs/operators';
import { AppState } from 'src/app/core/state/app.state';
import { selectUserID } from 'src/app/core/state/auth/auth.selector';
import { CreateRequested } from 'src/app/core/state/check-ins/check-in.actions';
import { CheckIn } from 'src/app/core/state/check-ins/check-in.state';
import { ClientStoreDispatcher } from 'src/app/core/state/client/client.dispatcher';

@Component({
    selector: 'app-weekly-check-in',
    templateUrl: './weekly-check-in.component.html',
    styleUrls: ['./weekly-check-in.component.scss'],
})
export class WeeklyCheckInComponent implements OnInit {

    form: FormGroup;

    macros = new FormControl('');
    cardioProtocol = new FormControl('');
    missedCardio = new FormControl('');
    medicalIssues = new FormControl('');
    menstrualCycle = new FormControl('No');
    adherenceLevel = new FormControl(1, [Validators.min(1), Validators.max(10)]);
    weekSummary = new FormControl('');
    energyLevel = new FormControl('Great');
    requests = new FormControl('');
    questions = new FormControl('');



    requestInProgress$: Observable < boolean > ;
    sex$: Observable < 'M' | 'F' > ;

    constructor(
        public store: Store < AppState > ,
        public clientService: ClientStoreDispatcher,
        public fb: AngularFirestore
    ) {
        this.clientService.loadAll();
        this.sex$ = this.clientService.selectUserAsClient().pipe(
            first(client => client != null),
            map(client => client.sex)
        );
    }

    ngOnInit() {

        this.form = new FormGroup({
            'macros': this.macros,
            'cardioProtocol': this.cardioProtocol,
            'missedCardio': this.missedCardio,
            'medicalIssues': this.medicalIssues,
            'menstrualCycle': this.menstrualCycle,
            'adherenceLevel': this.adherenceLevel,
            'weekSummary': this.weekSummary,
            'energyLevel': this.energyLevel,
            'requests': this.requests,
            'questions': this.questions,
        });
    }

    async onSubmit(form) {
        const userID = await this.store.select(selectUserID).pipe(first(userID => userID != null && userID != '')).toPromise();
        const checkIn: CheckIn = {
            ...form,
            userID,
            'id': this.generateRandomID(),
            'timestamp': new Date(),
        };

        this.store.dispatch(new CreateRequested(checkIn));
    }

    generateRandomID() {
        var randLetter = String.fromCharCode(65 + Math.floor(Math.random() * 26));
        var randomID = randLetter + Date.now();
        return randomID;
    }

}
