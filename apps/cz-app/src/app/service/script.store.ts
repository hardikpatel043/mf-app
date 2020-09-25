interface Scripts {
  name: string;
  src: string;
}
export const ScriptStore: Scripts[] = [
  {
    name: 'aggridangular',
    src: 'libs/ag-grid-angular.umd.js',
  },
  {
    name: 'aggridcommunity',
    src: 'libs/ag-grid-community.js',
  },
];
