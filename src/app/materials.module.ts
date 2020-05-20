import { NgModule } from '@angular/core';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';

const modules = [
    MatInputModule,
    MatFormFieldModule
];

@NgModule({
    'declarations': [],
    'imports': [
        ...modules
    ],
    'exports': [
        ...modules
    ]
})
export class MaterialsModule {}
