import { Component, OnInit } from '@angular/core';
import {StorageService} from '../../storage.service';
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-storage-manager',
  templateUrl: './storage-manager.component.html',
  styleUrls: ['./storage-manager.component.scss'],
})
export class StorageManagerComponent implements OnInit {
  storage: string;
  storageArr: string[];

  constructor(private sharedData: StorageService, private alertController: AlertController) {}

  ngOnInit() {
    this.sharedData.sharedCurrentStorageString.subscribe(storage => this.storage = storage);
    this.storageArr = [];
    this.storageArr.push(this.storage);
  }

  selectStorage(storageString: string) {
    if (this.sharedData.currentStorageString.getValue() !== storageString) {
      if (this.sharedData.setStorageString(storageString)) {
        this.sharedData.clearSelectedProduct();
      } else {
        this.reservedStringWarning().then();
      }
    }
  }
  async reservedStringWarning() {
    const alert = await this.alertController.create({
      header: 'Switch Storage Failed',
      message: 'The storage name you entered is reserved.',
      buttons: ['Ok']
    });
    await alert.present();
  }
  addStorage() {
    if (!this.storageArr.includes(this.storage)) {
      this.storageArr.push(this.storage);
      this.sharedData.updateStorageStrings(this.storageArr);
    }
    this.selectStorage(this.storage);
  }
  async insertInitialValue() {
    await this.sharedData.addProduct(this.sharedData.getInitialProductData());
  }
}
