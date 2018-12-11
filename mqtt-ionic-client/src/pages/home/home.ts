import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { WebsocketsProvider } from '../../providers/websockets/websockets';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  username: string;
  isConnected: Boolean = false;
  inputText: string;
  messages: Array<{ client: string, message: string }>;

  constructor(public navCtrl: NavController, private navParams: NavParams,public wsocket: WebsocketsProvider) {
    this.username = this.navParams.get('username');
    this.messages = wsocket.messages;
  } 

  ionViewDidLoad() {
    this.wsocket.connect(this.username, "userpassword");
    this.wsocket.messagesSubject.subscribe((messages) => {
      this.messages = messages;
    });
    this.wsocket.connectedSubject.subscribe((status) => {
      this.isConnected = status;
    });
  }

  sendMessage() {
    if (this.inputText != "") {
      this.wsocket.send({ client: this.username , message: this.inputText });
      this.inputText = "";
    }
  }

  ionViewWillLeave() {
    this.wsocket.disconnect();
  }

}
