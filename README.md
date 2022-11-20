# Web Temps Reel

## Setup project

2 methodes :

- Docker-compose avec un volume pointant sur le dossier src
- En local

## Commands

### Docker Compose Startup

```bash
docker-compose up --detach --build
```

### Docker Compose Shutdown

```bash
docker-compose down --remove-orphans --volumes --timeout 0
```

## Présentation

### Equipe 5 IWJ

- DAUDÉ Maxime
- RIVO Jonathan
- ZIANI Amine
- MBOMBO MOKONDA Christ

### Sujet
Vous faites partie d’un grand groupe moto qui souhaite moderniser sa plateforme avec la mise en
place d’un système d'échange instantané afin de renforcer sa communication auprès de ses clients.

#### Role User
[x] Il est possible de demander à communiquer avec un conseiller de vente

[] En cas de conseiller non-disponible, il n’est pas possible de demander à communiquer avec un conseiller de vente

[] Il est possible de communiquer avec un chatbot pour l’entretien d’une moto (voir workflow - Sujet.pdf)

[] Il est possible de communiquer avec les autres clients

[] Il est possible de rejoindre des salons de discussions prédéfinis par un administrateur

[] Il n’est pas possible de rejoindre un salon de discussion complet

[] Il n’est pas possible de communiquer sur un salon de discussion supprimé

[] Il est possible de recevoir des notifications commerciales d’un administrateur

#### Role Admin
[] Il est possible de voir les demandes de communication en attente

[] Il est possible de refuser une demande de communication

[] Il est possible d’accepter une demande de communication

[] Il est possible de s’enregistrer comme étant disponible pour communiquer avec des clients

[] Il est possible de créer un salon de discussion

[] Il est possible de modifier le nom d’un salon de discussion

[] Il est possible de modifier le volume d'utilisateurs d’un salon de discussion

[] Il est possible de supprimer un salon de discussion

[] Il est possible d'émettre des notifications commerciales

### Contraintes techniques
- Utilisation de la librairie socket.io ou ws pour les WebSocket uniquement
- Utilisation de la librairie socket.io-client ou l’API Web WebSocket uniquement
- Utilisation de frameworks JavaScript autorisée
- Utilisation de frameworks CSS autorisée
- Utilisation de frameworks Node.js autorisée
- Obligation de documenter l’installation du projet
- Obligation de prévoir un jeu de données pour l’utilisation du projet
- Obligation de sécuriser au maximum l’application et le livrable
- Obligation d’utiliser Docker & Docker Compose
- Obligation d’implémenter les notification avec du SSE

### Bonus
- Librairie NPM
- UX & UI travaillés
- Tests unitaires, d’intégration & E2E
- Tests de performance
- Monitoring applicatif (Sentry, Crashlytics, ..)
- SEO travaillé
- Intégration & Déploiement continu
- Optimisation des assets clients
- Hébergé + nom de domaine public
