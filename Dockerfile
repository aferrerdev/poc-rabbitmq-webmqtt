FROM rabbitmq:3-management

RUN rabbitmq-plugins enable --offline rabbitmq_web_mqtt

EXPOSE 15671 15672 15675