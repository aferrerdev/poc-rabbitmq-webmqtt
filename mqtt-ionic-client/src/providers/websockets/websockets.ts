import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Paho } from 'ng2-mqtt/mqttws31';
import { Subject } from 'rxjs/Subject';
import { ToastController } from 'ionic-angular';

@Injectable()
export class WebsocketsProvider {

  // Connection settings
  private host: string = "192.168.7.197";
  private port: number = 15675;

  public client: Paho.MQTT.Client;
  public connected: boolean = false;

  public messages: Array<{ client: string, message: string }>;
  public messagesSubject: Subject<Array<{ client: string, message: string }>>;
  public connectedSubject: Subject<Boolean>;

  constructor(public http: HttpClient, public toast: ToastController) {
    this.messages = new Array<{ client: string, message: string }>();
    this.messagesSubject = new Subject<Array<{ client: string, message: string }>>()
    this.connectedSubject = new Subject<Boolean>();
    
  }

  /**
   * Connect to MQTT service
   * @param {string} username 
   * @param {string} token 
   */
  public connect(username: string, token: string) {
    this.client = new Paho.MQTT.Client(this.host, this.port, "/ws", username);
    this.client.onConnectionLost = (responseObject: Object) => {
      console.log('Connection lost.');
      this.connected = false;
      this.connectedSubject.next(this.connected);
    };
    this.client.onMessageArrived = (message: Paho.MQTT.Message) => {
      console.log('Message arrived.');
      console.log(message);
      this.messages.push(JSON.parse(message.payloadString))
      this.messagesSubject.next(this.messages);
    };
    this.client.connect({ 
      userName: username,
      password: token,
      timeout: 3,
      useSSL: false,
      keepAliveInterval: 30,
      onSuccess: this.onConnected.bind(this), 
      onFailure: this.onFailure.bind(this)
    });
  }

  private onConnected():void {
    console.log('Connected to broker.');
    this.connected = true;
    this.connectedSubject.next(this.connected);
    this.client.subscribe('/topic/test', {qos: 1});
    const toast = this.toast.create({
      message: 'Connected',
      duration: 1000
    });
    toast.present();
  }

  private onFailure(message):void {
    console.log("CONNECTION FAILURE - " + JSON.stringify(message));
  }

  public send(text: any) {
    let message = new Paho.MQTT.Message(JSON.stringify(text));
    message.destinationName = "/topic/test";
    this.client.send(message);
  }

  public disconnect() {
    this.client.disconnect();
    const toast = this.toast.create({
      message: 'Disconnected',
      duration: 1000
    });
    toast.present();
  }
}
