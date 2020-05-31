import { NgModule } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatOptionModule } from '@angular/material/core';
import {MatSelectModule} from '@angular/material/select';
import {MatRadioModule} from '@angular/material/radio';

const modules = [
    MatInputModule,
    MatFormFieldModule,
    MatIconModule,
    MatOptionModule,
    MatSelectModule,
    MatRadioModule,
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
