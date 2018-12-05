# POC - RABBITMQ WEB-MQTT + BACKEND AUTHENTICATION
This is a small project to test the viability of a realtime messaging comunication using WebMQTT powered by (RabbitMQ).
One important requisite is to validate and authenticate users throught an external PHP webservice.
This demo had been built using Docker containers.

## Architecture components
1. RabbitMQ + Plugins (WebMQTT, Management UI, Backend Auth) - Docker container.
2. PHP Backend using Slim Framework to validate users connected to the websockets MQTT server.
3. Simple Javascript client to test this features using browser.
4. Ionic 3 hybrid app example using mqttws31 library port: https://www.npmjs.com/package/ng2-mqtt.

## Docker config
To automate the building of the rabbitmq container I have created some basic files in the docker-config/ folder which will create some basic configuration for:
    - Management admin user creation.
    - Initialize HTTP Authentication routes for the rabbitmq plugin.

In the init.sh file the following line should be removed for production environments.
This line enables the access for the user and password: "guest" "guest".
```
{loopback_users, []},
``` 

## Build the docker architecture
To run this POC you only need to run docker-compose commands from the root folder of the project:
```
docker-compose build
docker-compose run
```
To delete and rebuild the containers only need to run:
```
docker-compose down
docker-compose build
docker-compose up
```
To stop and start a running or stopped architecture:
```
docker-compose stop
docker-compose start
```