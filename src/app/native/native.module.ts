import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SecurestorageComponent } from './securestorage/securestorage.component';
import { AppversionComponent } from './appversion/appversion.component';
import { IonicModule } from '@ionic/angular';
import { FormsModule } from '@angular/forms';

@NgModule({
  declarations: [SecurestorageComponent, AppversionComponent],
  imports: [
    CommonModule, IonicModule, FormsModule
  ],
  exports: [SecurestorageComponent, AppversionComponent]
})
export class NativeModule { }
