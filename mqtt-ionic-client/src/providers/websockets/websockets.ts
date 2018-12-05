import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Paho } from 'ng2-mqtt/mqttws31';
/*
  Generated class for the WebsocketsProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class WebsocketsProvider {

  // Connection settings
  private host: string = "localhost";
  private port: number = 15675;

  private _client: Paho.MQTT.Client;

  constructor(public http: HttpClient) {
    this._client = new Paho.MQTT.Client(this.host, this.port, "/ws", "clientId");
    this._client.onConnectionLost = (responseObject: Object) => {
      console.log('Connection lost.');
    };
    this._client.onMessageArrived = (message: Paho.MQTT.Message) => {
      console.log('Message arrived.');
    };
    this.connect("admin", "example");
  }

  /**
   * Connect to MQTT service
   * @param {string} username 
   * @param {string} token 
   */
  private connect(username: string, token: string) {
    this._client.connect({ 
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
  }

  private onFailure(message):void {
    console.log("CONNECTION FAILURE - " + JSON.stringify(message));
  }
}
