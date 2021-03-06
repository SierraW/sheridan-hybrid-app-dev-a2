import { Injectable } from '@angular/core';
import {BehaviorSubject} from 'rxjs';
// @ts-ignore
import productDataJson from '../assets/productData.json';
import {Product} from './models/Product';
import { SecureStorage, SecureStorageObject } from '@ionic-native/secure-storage/ngx';

@Injectable({
  providedIn: 'root'
})
export class StorageService {
  private reservedString = 'myStorage';
  private storageStrings = 'storageStrings';
  private defaultStorage = 'storage';
  currentStorageString = new BehaviorSubject(this.defaultStorage);
  sharedCurrentStorageString = this.currentStorageString.asObservable();
  selectedProduct = new BehaviorSubject<Product>({description: '', pricePerUnit: 0, productId: '', quantityOnHand: 0, reorderQuantity: 0});
  sharedSelectedProduct = this.selectedProduct.asObservable();

  constructor(private secureStorage: SecureStorage) {
  }
  setStorageString(storageString: string): boolean {
    if (storageString === this.reservedString) {
      return false;
    }
    this.currentStorageString.next(storageString);
    return true;
  }
  setSelectedProduct(product: Product) {
    this.selectedProduct.next(product);
  }
  clearSelectedProduct() {
    this.selectedProduct.next({description: '', pricePerUnit: 0, productId: '', quantityOnHand: 0, reorderQuantity: 0});
  }
  getMyStorageStrings(): Promise<string[]> {
    return new Promise((resolve) => {
      this.secureStorage.create(this.reservedString)
        .then((storage: SecureStorageObject) => {
          storage.get(this.storageStrings)
            .then(data => resolve(JSON.parse(data)))
            .catch(() => {
              storage.set(this.storageStrings, JSON.stringify([this.defaultStorage])).then();
              resolve([this.defaultStorage]);
            });
        });
    });
  }
  getInitialProductData(): Product[] {
    return productDataJson;
  }
  addProduct(products: Product[]): Promise<number[]> {
    return new Promise<number[]>(((resolve) => {
      this.secureStorage.create(this.currentStorageString.getValue())
        .then(async (storage: SecureStorageObject) => {
          let inserted = 0;
          for (const product of products) {
            await storage.set(product.productId, JSON.stringify(product))
              .then(() => inserted++);
          }
          resolve([products.length, inserted]);
        });
    }));
  }

  getProducts(id: string= ''): Promise<Product[]> {
    return new Promise<Product[]>((resolve) => {
      const result: Product[] = [];
      this.secureStorage.create(this.currentStorageString.getValue())
        .then((storage: SecureStorageObject) => {
          storage.keys()
            .then(async keys => {
              if (id === '') {
                for (const key of keys) {
                  await storage.get(key)
                    .then(product => {
                      result.push(JSON.parse(product));
                    });
                }
                resolve(result);
              } else {
                if (keys.includes(id)) {
                  await storage.get(id)
                    .then(product => {
                      result.push(JSON.parse(product));
                    });
                  resolve(result);
                } else {
                  resolve(result);
                }
              }
            });
        });
    });
  }

  setProduct(ofProduct: Product, remove: boolean= false): Promise<boolean> {
    return new Promise<boolean>(((resolve, reject) => {
      this.secureStorage.create(this.currentStorageString.getValue())
        .then((storage: SecureStorageObject) => {
          if (remove) {
            storage.remove(ofProduct.productId).then(() => resolve(true)).catch(err => reject(err));
          } else {
            storage.set(ofProduct.productId, JSON.stringify(ofProduct)).then(() => resolve(true)).catch(err => reject(err));
          }
        })
        .catch(err => reject(err));
    }));
  }

  removeProduct(productId: string): Promise<boolean> {
    return this.setProduct({productId, description: '', pricePerUnit: 0, quantityOnHand: 0, reorderQuantity: 0}, true);
  }

  removeAll(): Promise<boolean> {
    return new Promise<boolean>(((resolve, reject) => {
      this.secureStorage.create(this.currentStorageString.getValue())
        .then((storage: SecureStorageObject) => {
          storage.clear()
            .then(() => resolve(true), error => reject(error));
        });
    }));
  }

  updateStorageStrings(storageArr: string[]) {
    this.secureStorage.create(this.reservedString)
      .then((storage: SecureStorageObject) => {
        storage.set(this.storageStrings, JSON.stringify(storageArr)).then();
      });
  }
}
