FROM rabbitmq:3-management

RUN rabbitmq-plugins enable --offline rabbitmq_web_mqtt
RUN rabbitmq-plugins enable rabbitmq_auth_backend_http

EXPOSE 15671 15672 15675