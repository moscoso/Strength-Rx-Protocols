import { Component, OnInit, Input } from '@angular/core';
import { Client, INIT_CLIENT } from 'src/app/core/state/client/client.state';
import { Observable, of } from 'rxjs';
import { ProfileStoreDispatcher } from 'src/app/core/state/profile/profiles.dispatcher';
import { ClientStoreDispatcher } from 'src/app/core/state/client/client.dispatcher';
import { ProgramStoreDispatcher } from 'src/app/core/state/program/program.dispatcher';
import { Program } from 'src/app/core/state/program/program.state';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { first } from 'rxjs/operators';

@Component({
    'selector': 'assign-program',
    'templateUrl': './assign-program.component.html',
    'styleUrls': ['./assign-program.component.scss'],
})
export class AssignProgramComponent implements OnInit {

    @Input() clientID: string;

    public iAmTrainer$: Observable < boolean > = of (false);
    public profileIsClient$: Observable < boolean > = of (false);
    public programList$: Observable < Program[] > = of ([]);
    public requestInProgress$: Observable < boolean > = of (false);

    form: FormGroup;
    programs = new FormControl([], [Validators.required]);

    defaultProgram: Program;

    constructor(
        public profileService: ProfileStoreDispatcher,
        public clientService: ClientStoreDispatcher,
        public programService: ProgramStoreDispatcher,
    ) {}

    ngOnInit() {
        this.form = new FormGroup({
            'programs': this.programs
        });
        this.programService.loadAll();
        this.programList$ = this.programService.selectAll();
        this.iAmTrainer$ = this.profileService.selectUserIsTrainer();
        this.requestInProgress$ = this.programService.selectRequestInProgress();
        this.clientService.loadAll();
        this.clientService.selectClient(this.clientID).pipe(
            first(client => client != null && client.assignedProgram != null)
        ).subscribe((client) => {
            this.defaultProgram = client.assignedProgram;
            this.programs.setValue(this.defaultProgram);

        });
    }

    async assignProgram(program: Program) {
        this.clientService.assignProgram(this.clientID, program);
    }

    async onSubmit(form) {
        console.log(form);
        this.assignProgram(this.programs.value);
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
