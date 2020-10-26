import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ModalController } from '@ionic/angular';
import { Observable, of } from 'rxjs';
import { ProgramStoreDispatcher } from 'src/app/core/state/program/program.dispatcher';
import { Program } from 'src/app/core/state/program/program.state';

@Component({
    'selector': 'app-subscribe-to-program',
    'templateUrl': './subscribe-to-program.component.html',
    'styleUrls': ['./subscribe-to-program.component.scss'],
})
export class SubscribeToProgramComponent implements OnInit {

    form: FormGroup;
    requestInProgress$: Observable < boolean > ;
    programList$: Observable < Program[] > = of ([]);
    programControl = new FormControl(null, [Validators.required]);


    constructor(
        public programService: ProgramStoreDispatcher,
        public modalController: ModalController,
    ) {}

    ngOnInit() {
        this.form = new FormGroup({
            'program': this.programControl,
        });

        this.requestInProgress$ = this.programService.selectRequestInProgress();
        this.programService.loadAll();
        this.programList$ = this.programService.selectAll();
    }

    onSubmit(form) {
        this.modalController.dismiss({'program': form.program}, undefined, 'subscribe-to-program');
    }


    /**
     * A function to compare the option values with the selected values.
     * @param e1 the first argument is a value from an option.
     * @param e2 the second is a value from the selection.
     * @returns a boolean should be returned.
     */
    comparePrograms(e1: Program, e2: Program): boolean {
        return e1 && e2 ? e1.id === e2.id : e1 === e2;
    }

}
