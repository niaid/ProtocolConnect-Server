import { Component } from '@angular/core';

// To disable warnings about missing module,
// create app.component.html.d.ts and declare the template.
// The warning should go away when TypeScript 2.0 compiler is released.
// Ref: https://forums.meteor.com/t/angular2-the-right-way-to-import-a-html-template/26774/2
import template from './app.component.html';
 
@Component({
  selector: 'app',
  template
})
export class AppComponent {
}
