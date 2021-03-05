import { Component, OnInit } from '@angular/core';
import {Product} from '../../models/Product';

@Component({
  selector: 'app-storage-add-record',
  templateUrl: './storage-add-record.component.html',
  styleUrls: ['./storage-add-record.component.scss'],
})
export class StorageAddRecordComponent implements OnInit {

  product: Product;
  constructor() { }

  ngOnInit() {
  }

  insert() {

  }
}
