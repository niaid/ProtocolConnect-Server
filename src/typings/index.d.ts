/// <reference path="globals/angular2-compilers/index.d.ts" />
/// <reference path="globals/es6-promise/index.d.ts" />
/// <reference path="globals/es6-shim/index.d.ts" />
/// <reference path="globals/meteor-restivus/index.d.ts" />
/// <reference path="globals/meteor/index.d.ts" />
/// <reference path="globals/node/index.d.ts" />

declare module Mongo {

  interface Collection {
        aggregate(args:any, filter:any): Array<any>;
  }
}
