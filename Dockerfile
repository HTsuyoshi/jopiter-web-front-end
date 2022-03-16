FROM node:14
WORKDIR /opt/app

COPY ./package.json ./

RUN ["yarn"]

COPY src/ ./src

COPY views/ ./views

ENTRYPOINT ["yarn"]
