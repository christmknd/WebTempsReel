# Web Temps Reel

2 methodes de travail

- Docker-compose avec un volume pointant sur le dossier src
- En local

## Requirements

- Docker
- Docker Compose

## Commands

### Docker Compose Startup

```bash
docker-compose up --detach
```

### Dependencies Installation

```bash
docker-compose exec node npm install
```

### Client Startup

```bash
docker-compose exec node npm start:client
```

### Socket Startup

```bash
docker-compose exec node npm start:socket
```

### Docker Compose Shutdown

```bash
docker-compose down --remove-orphans --volumes --timeout 0
```

### Lancer test K6

```bash
docker-compose run --rm k6 run /performance/script.js
```
