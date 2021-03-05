import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {Product} from '../../models/Product';
import {StorageService} from '../../storage.service';
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-storage-edit',
  templateUrl: './storage-edit.component.html',
  styleUrls: ['./storage-edit.component.scss'],
})
export class StorageEditComponent implements OnInit {

  @Input() pid: string;
  @Output() outputDeleted: EventEmitter<boolean>;
  product?: Product;
  constructor(private sharedData: StorageService, private alertController: AlertController) { }

  ngOnInit() {
    this.refresh().then();
  }

  async refresh() {
    const result = await this.sharedData.getProducts(this.pid);
    if (result.length > 0) {
      this.product = result[0];
    } else {
      this.product = undefined;
    }
  }

  edit() {
    if (this.product) {
      this.sharedData.setProduct(this.product).then(() => this.showAlert(false, false));
    } else {
      this.showAlert(false, true, 'Product not found.').then();
    }
  }

  delete() {
    this.sharedData.removeProduct(this.pid).then(() => this.showAlert(true, true));
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
      this.outputDeleted.emit(true);
    }
  }

}
