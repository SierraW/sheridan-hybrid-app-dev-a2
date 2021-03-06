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
    this.sharedData.getMyStorageStrings().then(strings => this.storageArr = strings);
  }

  selectStorage(storageString: string): boolean {
    if (this.sharedData.currentStorageString.getValue() !== storageString) {
      if (this.sharedData.setStorageString(storageString)) {
        this.sharedData.clearSelectedProduct();
        return true;
      } else {
        this.storage = this.sharedData.currentStorageString.getValue();
        this.reservedStringWarning().then();
        return false;
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
    if (this.selectStorage(this.storage) && !this.storageArr.includes(this.storage)) {
      this.storageArr.push(this.storage);
      this.sharedData.updateStorageStrings(this.storageArr);
    }
  }
  async insertInitialValue() {
    await this.sharedData.addProduct(this.sharedData.getInitialProductData());
    await this.insertSuccessful();
  }
  async insertSuccessful() {
    const alert = await this.alertController.create({
      header: 'Insert',
      message: 'Insert success.',
      buttons: ['Ok']
    });
    await alert.present();
  }
}
