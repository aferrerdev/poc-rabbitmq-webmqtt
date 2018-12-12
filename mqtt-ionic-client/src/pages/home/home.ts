import { Component, ViewChild } from '@angular/core';
import { NavController, NavParams, ToastController, Content } from 'ionic-angular';
import { WebsocketsProvider } from '../../providers/websockets/websockets';
import { StartPage } from '../start/start';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  @ViewChild(Content) content: Content;

  username: string;
  isConnected: Boolean = false;
  inputText: string;
  messages: Array<{ client: string, message: string }>;

  constructor(public navCtrl: NavController, private navParams: NavParams, public wsocket: WebsocketsProvider, public toast: ToastController) {
    this.username = this.navParams.get('username');
    this.messages = wsocket.messages;
  } 

  ionViewDidLoad() {
    this.wsocket.startSession(this.username, "userpassword");
    this.wsocket.messagesSubject.subscribe((messages) => {
      this.messages = messages;
      this.content.scrollToBottom();
    });
  }

  sendMessage() {
    if (this.inputText != "") {
      this.wsocket.send({ client: this.username , message: this.inputText });
      this.inputText = "";
    }
  }

  logout() {
    let toast = this.toast.create({
      message: 'Disconected',
      duration: 2000
    });
    toast.present();
    this.navCtrl.setRoot(StartPage);
  }

  ionViewWillLeave() {
    this.wsocket.disconnect();
  }

}
