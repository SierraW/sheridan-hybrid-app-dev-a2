import { Component, OnInit } from '@angular/core';
import {StorageService} from '../../storage.service';

@Component({
  selector: 'app-storage-manager',
  templateUrl: './storage-manager.component.html',
  styleUrls: ['./storage-manager.component.scss'],
})
export class StorageManagerComponent implements OnInit {
  storage: string;
  storageArr: string[];

  constructor(private sharedData: StorageService) {}

  ngOnInit() {
    this.sharedData.sharedCurrentStorageString.subscribe(storage => this.storage = storage);
    this.storageArr = [];
    this.storageArr.push(this.storage);
  }

  selectStorage(storageString: string) {
    this.sharedData.setStorageString(storageString);
  }
  addStorage() {
    if (!this.storageArr.includes(this.storage)) {
      this.storageArr.push(this.storage);
    }
    this.selectStorage(this.storage);
  }
  async insertInitialValue() {
    const result: number[] = await this.sharedData.addProduct(this.sharedData.getInitialProductData());
    console.log('For total of ', result[0], ' products, ', result[1], ' successfully inserted.');
  }
}
