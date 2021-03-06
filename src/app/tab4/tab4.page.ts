import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';

@Component({
  selector: 'app-tab4',
  templateUrl: './tab4.page.html',
  styleUrls: ['./tab4.page.scss'],
})
export class Tab4Page implements OnInit {

  pid: string;
  constructor(private router: Router) { }

  ngOnInit() {
  }

  redirect() {
    this.router.navigate(['tabs/tab3']).then();
  }
}
