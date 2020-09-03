import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'mf-app-aboutus',
  templateUrl: './aboutus.component.html',
  styleUrls: ['./aboutus.component.css'],
})
export class AboutusComponent implements OnInit {
  elementUrl = 'aboutus/main-es2015.js';
  constructor() {}

  ngOnInit(): void {}
}
