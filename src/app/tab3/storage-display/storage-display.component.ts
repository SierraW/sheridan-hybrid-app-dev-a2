import { Component, OnInit } from '@angular/core';
import {Product} from '../../models/Product';
import {StorageService} from '../../storage.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-storage-display',
  templateUrl: './storage-display.component.html',
  styleUrls: ['./storage-display.component.scss'],
})
export class StorageDisplayComponent implements OnInit {

  error: string;
  products: Product[];
  constructor(private sharedData: StorageService, private router: Router) { }

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
}
