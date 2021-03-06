import { Component, OnInit } from '@angular/core';
import {Product} from '../../models/Product';
import {Router} from '@angular/router';
import {StorageService} from '../../storage.service';

@Component({
  selector: 'app-storage-search',
  templateUrl: './storage-search.component.html',
  styleUrls: ['./storage-search.component.scss'],
})
export class StorageSearchComponent implements OnInit {

  searchString: string;
  searchProducts: Product[];
  constructor(private sharedData: StorageService, private router: Router) { }

  ngOnInit() {
    this.searchString = '';
    this.searchProducts = [];
  }

  async search() {
    this.searchProducts = await this.sharedData.getProducts(this.searchString);
  }
  redirect(product: Product) {
    this.sharedData.setSelectedProduct(product);
    this.router.navigate(['tabs/tab4']).then();
  }
}
