import { Component, OnInit } from '@angular/core';
import {StorageService} from '../../storage.service';
import {AlertController} from '@ionic/angular';

@Component({
  selector: 'app-storage-add-record',
  templateUrl: './storage-add-record.component.html',
  styleUrls: ['./storage-add-record.component.scss'],
})
export class StorageAddRecordComponent implements OnInit {

  productId: string;
  description: string;
  quantityOnHand: number;
  pricePerUnit: number;
  reorderQuantity: number;
  constructor(private sharedData: StorageService, private alertController: AlertController) { }

  ngOnInit() {
  }

  insert() {
    this.sharedData.addProduct(
      [{
          productId: this.productId,
        description: this.description,
        quantityOnHand: this.quantityOnHand,
        pricePerUnit: this.pricePerUnit,
        reorderQuantity: this.reorderQuantity
      }]
    ).then();
    this.insertSuccessful().then();
  }
  async insertSuccessful() {
    const alert = await this.alertController.create({
      header: 'Insert',
      message: 'Successfully insert.',
      buttons: ['Ok']
    });
    await alert.present();
  }
}
