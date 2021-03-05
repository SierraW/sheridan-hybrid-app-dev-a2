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
  currentStorageString = new BehaviorSubject('storage');
  sharedCurrentStorageString = this.currentStorageString.asObservable();

  constructor(private secureStorage: SecureStorage) {}
  setStorageString(storageString: string) {
    this.currentStorageString.next(storageString);
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
    return new Promise<Product[]>((resolve, reject) => {
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
                  reject('No product found with id: ' + id);
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
    return this.setProduct({productId, description: '', pricePerUnit: 0, quantityOnHand: 0, reorderQuantity: 0});
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
}
