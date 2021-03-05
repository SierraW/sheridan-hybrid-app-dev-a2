import { Component, OnInit } from '@angular/core';
import {Product} from '../../models/Product';
import {Router} from '@angular/router';

@Component({
  selector: 'app-storage-search',
  templateUrl: './storage-search.component.html',
  styleUrls: ['./storage-search.component.scss'],
})
export class StorageSearchComponent implements OnInit {

  searchString: string;
  searchProducts: Product[];
  constructor(private sharedData, private router: Router) { }

  ngOnInit() {
    this.searchString = '';
    this.searchProducts = [];
  }

  search() {
    this.searchProducts = this.sharedData.getProducts(this.searchString);
  }
  redirect(product: Product) {
    this.router.navigate(['tabs/tab4'], {state: {product}}).then();
  }
}
