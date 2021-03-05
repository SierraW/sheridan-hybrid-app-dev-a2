import { Component, OnInit } from '@angular/core';
import {Product} from '../../models/Product';
import {StorageService} from '../../storage.service';

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
  constructor(private sharedData: StorageService) { }

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
    ).then(() => console.log('Insert successful.'));
  }
}
