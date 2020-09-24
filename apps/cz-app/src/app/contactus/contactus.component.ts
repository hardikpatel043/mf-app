import {
  AfterViewInit,
  Component,
  OnInit,
  TemplateRef,
  ViewChild,
  ViewContainerRef,
} from '@angular/core';

@Component({
  selector: 'mf-app-contactus',
  templateUrl: './contactus.component.html',
  styleUrls: ['./contactus.component.css'],
})
export class ContactusComponent implements OnInit, AfterViewInit {
  selectedItem = '';
  controls: any[] = [{ name: 'Home' }, { name: 'Aboutus' }];
  selectedConfig = {
    tag: 'mf-aboutus',
    url: 'aboutus/main-es2015.js',
    isModule: false,
    content: 'Increment',
    actionName: 'increment',
  };

  aboutConfig = {
    tag: 'mf-aboutus',
    url: 'aboutus/main-es2015.js',
    isModule: false,
    content: 'Increment',
    actionName: 'increment',
  };

  homeConfig = {
    tag: 'mf-home',
    url: 'home/main-es2015.js',
    isModule: false,
    content: 'Increment',
    actionName: 'increment',
  };

  constructor() {}

  ngOnInit(): void {}

  ngAfterViewInit() {}

  selectionChange($event) {
    if (this.selectedItem === 'Aboutus') {
      this.selectedConfig = this.aboutConfig;
    } else {
      this.selectedConfig = this.homeConfig;
    }
  }
}
