import { Component, OnInit } from '@angular/core';

import { ScriptService } from './../service/script.service';

@Component({
  selector: 'mf-app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
  elementUrl = 'home/main-es2015.js';
  isLoaded = false;
  constructor(private script: ScriptService) {
    this.script
      .load('aggridcommunity')
      .then((data) => {
        this.script.load('aggridangular').then((data1) => {
          this.isLoaded = true;
          console.log('script loaded ', data1);
        });
        console.log('script loaded ', data);
      })
      .catch((error) => console.log(error));
  }

  ngOnInit(): void {}
}
