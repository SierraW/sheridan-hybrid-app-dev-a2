import { Component, OnInit } from '@angular/core';
import { AppVersion } from '@ionic-native/app-version/ngx';

@Component({
  selector: 'app-appversion',
  templateUrl: './appversion.component.html',
  styleUrls: ['./appversion.component.scss'],
})
export class AppversionComponent implements OnInit {
  appName; vCode; vNumber; package;

  constructor(private appVersion: AppVersion) {
    this.appVersion.getAppName().then(value => this.appName = value).catch(error => alert(error));
    this.appVersion.getPackageName().then(value => this.package = value).catch(error => alert(error));
    this.appVersion.getVersionCode().then(value => this.vCode = value).catch(error => alert(error));
    this.appVersion.getVersionNumber().then(value => this.vNumber = value).catch(error => alert(error));
  }

  ngOnInit() {}

}
