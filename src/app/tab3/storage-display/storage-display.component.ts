import { Component, OnInit } from '@angular/core';
import {Product} from '../../models/Product';
import {StorageService} from '../../storage.service';
import {Router} from '@angular/router';
import {AlertController} from '@ionic/angular';

@Component({
  selector: 'app-storage-display',
  templateUrl: './storage-display.component.html',
  styleUrls: ['./storage-display.component.scss'],
})
export class StorageDisplayComponent implements OnInit {

  error: string;
  products: Product[];
  constructor(private sharedData: StorageService, private router: Router, private alertController: AlertController) { }

  ngOnInit() {
    this.error = '';
    this.getProducts();
  }
  getProducts() {
    this.sharedData.getProducts().then(products => this.products = products).catch(err => this.error = err);
  }
  redirect(product: Product) {
    this.sharedData.setSelectedProduct(product);
    this.router.navigate(['tabs/tab4']).then();
  }

  deleteAll() {
    this.confirm().then();
  }
  async confirm() {
    const alert = await this.alertController.create({
      header: 'Erase All Data',
      message: 'Are you sure you want to continue?',
      buttons: [{
        text: 'No',
        role: 'Cancel'
      }, {
        text: 'Yes',
        role: 'Ok',
        handler: () => this.sharedData.removeAll().then(() => this.deleteSuccessful().then(() => this.getProducts()))
      }]
    });
    await alert.present();
  }
  async deleteSuccessful() {
    const alert = await this.alertController.create({
      header: 'Erase',
      message: 'Data delete success.',
      buttons: ['Ok']
    });
    await alert.present();
  }

  delete(product: Product) {
    this.sharedData.removeProduct(product.productId).then(() => this.deleteSuccessful().then(() => this.getProducts()));
  }
}
