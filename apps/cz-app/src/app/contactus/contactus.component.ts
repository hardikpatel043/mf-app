import { ChangeDetectorRef, Component, OnInit } from '@angular/core';

@Component({
  selector: 'mf-app-contactus',
  templateUrl: './contactus.component.html',
  styleUrls: ['./contactus.component.css'],
})
export class ContactusComponent implements OnInit {
  selectedItem = 'Aboutus';
  controls: any[] = [{ name: 'Home' }, { name: 'Aboutus' }];
  selectedConfig = {
    tag: 'mf-aboutus',
    url: 'aboutus/main-es2015.js',
    isModule: false,
    content: 'Increment',
    actionName: 'increment',
  };
  dynamicConfigs = [
    {
      tag: 'mf-aboutus',
      url: 'aboutus/main-es2015.js',
      isModule: false,
      content: 'Increment',
      actionName: 'increment',
    },
    {
      tag: 'mf-home',
      url: 'home/main-es2015.js',
      isModule: false,
      content: 'Increment',
      actionName: 'increment',
    },
  ];

  constructor(private cdr: ChangeDetectorRef) {}

  ngOnInit(): void {}

  selectionChange($event) {
    if (this.selectedItem === 'Aboutus') {
      this.selectedConfig = Object.assign(this.dynamicConfigs[0]);
    } else {
      this.selectedConfig = Object.assign(this.dynamicConfigs[1]);
    }
    console.log(this.selectedItem);
    console.log(this.selectedConfig);
  }
}
