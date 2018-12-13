import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Paho } from 'ng2-mqtt/mqttws31';
import { Subject } from 'rxjs/Subject';

@Injectable()
export class WebsocketsProvider {

  // Connection settings
  private host: string = "es-staffapp-test-02.westeurope.cloudapp.azure.com";
  private port: number = 15675;
  private username: string;
  private token: string;
  public client: Paho.MQTT.Client;

  // Received messages
  public messages: Array<{ client: string, message: string }>;

  // Subscribable objects
  public messagesSubject: Subject<Array<{ client: string, message: string }>>;

  constructor(public http: HttpClient) {
    this.messages = new Array<{ client: string, message: string }>();
    this.messagesSubject = new Subject<Array<{ client: string, message: string }>>()
  }

  public startSession(username: string, token: string) {
    this.username = username;
    this.token = token;
    this.connect(username, token);
  }

  public isConnected() {
    return this.client ? this.client.isConnected() : false;
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
        this.reconnection();
      };
      this.client.onMessageArrived = (message: Paho.MQTT.Message) => {
        console.log('Message arrived.');
        console.log(message);
        this.messages.push(JSON.parse(message.payloadString))
        this.messagesSubject.next(this.messages);
      };
      if (!this.isConnected()) {
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
      else {
        console.log("Client is already connected to MQTT broker.")
      }
  }

  private onConnected():void {
    console.log('Connected to broker.');
    this.client.subscribe('/topic/test', {qos: 1});
  }

  private onFailure(message):void {
    console.log("CONNECTION FAILURE - " + JSON.stringify(message));
    this.reconnection();
  }

  public send(text: any) {
    let message = new Paho.MQTT.Message(JSON.stringify(text));
    message.destinationName = "/topic/test";
    this.client.send(message);
  }

  public disconnect() {
    this.client.disconnect();
  }

  public reconnection() {
    let timeout = setTimeout(() => {
      if (!this.client.isConnected) {
        this.connect(this.username, this.token);
        clearTimeout(timeout);
      }
    }, 5000)
  }
}
