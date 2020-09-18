const webpack = require('webpack');
module.exports = {
  externals: {
    rxjs: 'rxjs',
    '@angular/core': 'ng.core',
    '@angular/common': 'ng.common',
    '@angular/common/http': 'ng.common.http',
    '@angular/platform-browser': 'ng.platformBrowser',
    '@angular/platform-browser-dynamic': 'ng.platformBrowserDynamic',
    '@angular/compiler': 'ng.compiler',
    '@angular/elements': 'ng.elements',
    'ag-grid-community': 'agGridCommunity',
    'ag-grid-angular': 'ag.grid.angular',
    '@angular/router': 'ng.router',
  },
};
