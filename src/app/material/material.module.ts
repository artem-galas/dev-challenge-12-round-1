import { NgModule } from '@angular/core';

import {
  MatButtonModule, MatCardModule, MatFormFieldModule, MatInputModule
} from '@angular/material';

const MATERIAL_COMPONENTS = [
  MatButtonModule,
  MatCardModule,
  MatFormFieldModule,
  MatInputModule
];

@NgModule({
  imports: MATERIAL_COMPONENTS,
  exports: MATERIAL_COMPONENTS,
})
export class MaterialModule { }
