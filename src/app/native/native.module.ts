import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AppversionComponent } from './appversion/appversion.component';
import { IonicModule } from '@ionic/angular';
import { FormsModule } from '@angular/forms';

@NgModule({
  declarations: [AppversionComponent],
  imports: [
    CommonModule, IonicModule, FormsModule
  ],
  exports: [AppversionComponent]
})
export class NativeModule { }
