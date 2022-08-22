# Jopiter web

Uma aplicação web desenvolvida para interagir com o [classificador](https://v2.backend.jopiter.app/api/v1/docs/swagger-ui/index.html#/classifier/classify).

O classificador recebe o nome de uma dada refeição e a partir disso mostra informações sobre essa refeição.

### Requerimentos

Para rodar a aplicação é preciso dos seguintes programas:

- docker
- make

### Rodar

Para rodar a aplicação primeiro é necessário criar a rede:

```sh
docker network create --gateway=172.28.0.1 --subnet 172.28.0.0/16 development
```

Para rodar a aplicação:

```sh
make
```
