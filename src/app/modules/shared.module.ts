import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslateModule } from '@ngx-translate/core';
import { FormControl, FormsModule, ReactiveFormsModule } from '@angular/forms';

const sharedModules = [
  CommonModule,
  ReactiveFormsModule,
  FormsModule,
];

@NgModule({
  declarations: [],
  imports: [
    ...sharedModules,
    TranslateModule.forChild(),
  ],
  exports: [
    ...sharedModules,
    TranslateModule,
  ]
})
export class SharedModule {
}
