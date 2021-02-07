import { Component, OnInit } from '@angular/core';
import { ProgramFacade } from 'src/app/core/state/program/program.facade';

@Component({
    'selector': 'app-create-program',
    'templateUrl': './create-program.page.html',
    'styleUrls': ['./create-program.page.scss'],
})
export class CreateProgramPage implements OnInit {

    constructor(
        public programService: ProgramFacade
    ) {}

    ngOnInit() {}

    onSubmit(program) {
        this.programService.create(program);
    }
}
