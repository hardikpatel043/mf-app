import {
  AfterViewInit,
  ChangeDetectorRef,
  Component,
  OnInit,
  TemplateRef,
  ViewChild,
  ViewContainerRef,
  ViewRef,
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
  loadme = true;
  @ViewChild('vc', { read: ViewContainerRef }) vc: ViewContainerRef;
  @ViewChild('tpl', { read: TemplateRef }) tpl: TemplateRef<any>;
  childViewRef: ViewRef;
  isLoading = false;
  constructor(private cdr: ChangeDetectorRef) {}

  ngOnInit(): void {}

  ngAfterViewInit() {
    this.childViewRef = this.tpl.createEmbeddedView(null);
  }

  insertChildView() {
    this.vc.insert(this.childViewRef);
  }

  removeChildView() {
    this.vc.detach();
  }

  selectionChange($event) {
    if (this.selectedItem === 'Aboutus') {
      console.log('aboutus');
      this.selectedConfig = this.dynamicConfigs[0];
    } else {
      console.log('home');
      this.selectedConfig = this.dynamicConfigs[1];
    }
    this.removeChildView();

    this.isLoading = true;
    setTimeout(() => {
      this.insertChildView();
      this.isLoading = false;
    }, 3000);
  }
}
