import { Component } from '@angular/core';
import { Login } from './login/login';

@Component({
  selector: 'app-root',
  imports: [Login],
  template: '<app-login />',
})
export class App {}
