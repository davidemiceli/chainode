# Base image
FROM confluent/platform

# Kafka Confluent version
ARG KAFKA_VERSION=4.1.0-2.11

# Configure environment
ENV LANG=C.UTF-8 \
    LC_ALL=C.UTF-8 \
    DEBIAN_FRONTEND=noninteractive

# Install Kafka Confluent
RUN wget http://packages.confluent.io/archive/4.1/confluent-oss-$KAFKA_VERSION.tar.gz -q --show-progress -O kafka-confluent.tar.gz
RUN tar xf kafka-confluent.tar.gz
RUN mv confluent-* confluent
RUN rm kafka-confluent.tar.gz

CMD ["cd", "confluent/bin", "&&", "./confluent", "start", "kafka", "&&", "./confluent", "log", "kafka", "-f"]
