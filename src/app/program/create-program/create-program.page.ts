import { Component, OnInit } from '@angular/core';
import { ProgramStoreDispatcher } from 'src/app/core/state/program/program.dispatcher';

@Component({
    'selector': 'app-create-program',
    'templateUrl': './create-program.page.html',
    'styleUrls': ['./create-program.page.scss'],
})
export class CreateProgramPage implements OnInit {

    constructor(
        public programService: ProgramStoreDispatcher
    ) {}

    ngOnInit() {}

    onSubmit(program) {
        this.programService.create(program);
    }
}
