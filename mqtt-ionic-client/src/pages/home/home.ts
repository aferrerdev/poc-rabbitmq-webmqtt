import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { WebsocketsProvider } from '../../providers/websockets/websockets';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  constructor(public navCtrl: NavController, public wsocket: WebsocketsProvider) {

  }

}
