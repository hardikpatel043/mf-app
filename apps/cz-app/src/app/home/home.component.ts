import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'mf-app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
  elementUrl = 'home/main-es2015.js';

  constructor() {}

  ngOnInit(): void {}
}
