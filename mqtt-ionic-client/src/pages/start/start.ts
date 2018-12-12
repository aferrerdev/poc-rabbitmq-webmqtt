import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { HomePage } from '../home/home';

@IonicPage()
@Component({
  selector: 'page-start',
  templateUrl: 'start.html',
})
export class StartPage {

  public username: string;

  constructor(public navCtrl: NavController, public navParams: NavParams) {

  }

  ionViewDidLoad() {
    this.username = localStorage.getItem("username");
  }

  continue() {
    localStorage.setItem("username", this.username);
    this.navCtrl.setRoot(HomePage, { username: localStorage.getItem("username") })
  }

}
