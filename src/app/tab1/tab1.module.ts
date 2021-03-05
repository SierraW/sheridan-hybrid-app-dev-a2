import { IonicModule } from '@ionic/angular';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Tab1Page } from './tab1.page';
import { ExploreContainerComponentModule } from '../explore-container/explore-container.module';

import { Tab1PageRoutingModule } from './tab1-routing.module';
import {NativeModule} from '../native/native.module';
import {GreetingsComponent} from './greetings/greetings.component';
import {StorageManagerComponent} from './storage-manager/storage-manager.component';

@NgModule({
    imports: [
        IonicModule,
        CommonModule,
        FormsModule,
        ExploreContainerComponentModule,
        Tab1PageRoutingModule,
        NativeModule
    ],
  declarations: [Tab1Page, GreetingsComponent, StorageManagerComponent]
})
export class Tab1PageModule {}
