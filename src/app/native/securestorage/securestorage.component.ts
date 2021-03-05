import { Component, OnInit } from '@angular/core';
import { SecureStorage, SecureStorageObject } from '@ionic-native/secure-storage/ngx';
import { KeyValue } from './KeyValue';

@Component({
  selector: 'app-securestorage',
  templateUrl: './securestorage.component.html',
  styleUrls: ['./securestorage.component.scss'],
})
export class SecurestorageComponent implements OnInit {
  msg = 'SecureStorage ...';
  inKey; inValue; keys: any[]; values: KeyValue[] = [];

  constructor(private secureStorage: SecureStorage) {
  }

  ngOnInit() {}

  showAll() {
    this.values = [];
    this.secureStorage.create('storage')
      .then((storage: SecureStorageObject) => {
        storage.keys()
          .then( data => {
            this.keys = data;
            for (let i = 0; i < this.keys.length; i++) {
              storage.get(this.keys[i])
                .then(d2 => {
                  this.values[i] = {key: this.keys[i], value: d2};
                }, error => console.log('Get error: ' + error));
            }
          }, error => console.log('showAll error: ' + error));
      });
  }

  addRec() {
    this.secureStorage.create('storage')
      .then((storage: SecureStorageObject) => {
        storage.set(this.inKey, this.inValue)
          .then(() => {
            this.msg = 'Record inserted';
          }, () => console.log('Record Not Inserted'));
      });
  }

  removeRec() {
    this.secureStorage.create('storage')
      .then((storage: SecureStorageObject) => {
        storage.remove(this.inKey)
          .then(() => {
            this.msg = 'Record deleted';
            this.showAll();
          }, () => this.msg = 'Record Not Deleted');
      });
  }

  removeAll() {
    this.secureStorage.create('storage')
      .then((storage: SecureStorageObject) => {
        storage.clear()
          .then(() => {
            this.msg = 'Records Deleted';
            this.values = [];
          }, () => this.msg = 'Records Not Deleted');
      });
  }

}
