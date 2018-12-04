FROM rabbitmq:3-management

RUN rabbitmq-plugins enable --offline rabbitmq_web_mqtt
RUN rabbitmq-plugins enable --offline rabbitmq_auth_backend_http

# Define environment variables.
ENV RABBITMQ_USER admin
ENV RABBITMQ_PASSWORD example

ADD ./docker-config/rabbitmq/init.sh /init.sh
RUN chmod +x /init.sh

EXPOSE 15671 15672 15675

# Inititlization
CMD ["/init.sh"]