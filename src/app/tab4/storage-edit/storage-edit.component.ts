import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {Product} from '../../models/Product';
import {StorageService} from '../../storage.service';
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-storage-edit',
  templateUrl: './storage-edit.component.html',
  styleUrls: ['./storage-edit.component.scss'],
})
export class StorageEditComponent implements OnInit {
  @Output() outputDeleted = new EventEmitter<boolean>();
  product?: Product;
  constructor(private sharedData: StorageService, private alertController: AlertController) { }

  ngOnInit() {
    this.refresh().then();
  }

  async refresh() {
    this.sharedData.sharedSelectedProduct.subscribe(pd => pd.productId === '' ? this.product = undefined : this.product = pd);
  }

  edit() {
    if (this.product) {
      this.sharedData.setProduct(this.product).then(() => this.showAlert(false, false));
    } else {
      this.showAlert(false, true, 'Product not found.').then();
    }
  }

  delete() {
    if (this.product) {
      this.sharedData.removeProduct(this.product.productId).then(() => {
        this.sharedData.clearSelectedProduct();
        this.showAlert(true, true).then();
      });
    } else {
      this.showAlert(false, true, 'Product not found.').then();
    }
  }

  async confirm(isDeleting: boolean) {
    const alert = await this.alertController.create({
      header: isDeleting ? 'Delete' : 'Edit',
      message: 'Are you sure you want to continue?',
      buttons: [{
        text: 'No',
        role: 'Cancel'
      }, {
        text: 'Yes',
        role: 'Ok',
        handler: () => isDeleting ? this.delete() : this.edit()
      }]
    });
    await alert.present();
  }

  async showAlert(isDeleting: boolean, shouldExit: boolean, message: string = 'Product updated.') {
    const alert = await this.alertController.create({
      header: isDeleting ? 'Delete' : 'Edit',
      message,
      buttons: ['OK']
    });
    await alert.present();
    await alert.onDidDismiss();
    if (shouldExit) {
      this.redirect();
    }
  }

  redirect() {
    this.outputDeleted.emit(true);
  }
}
