# Business Case

# Description

Bienvenue dans le projet Angular de l'application de gestion de livraisons. Cette application permet de gérer des livraisons de colis et de suivre l'état des livraisons par des livreurs. Elle inclut des fonctionnalités telles que l'ajout de livraisons, la mise à jour de l'état des livraisons et la vérification de l'état des tokens d'authentification.

# Fonctionnalités

- Utilisateur : Les utilisateurs peuvent s'inscrire, suivre leurs colis et confirmer leur adresse e-mail.

- Livreur : Les livreurs peuvent voir les colis qu'ils doivent livrer, mettre à jour leur emplacement et confirmer la livraison.

- Administrateur : Les administrateurs ont un accès complet au système, y compris la gestion des utilisateurs, des livreurs et des colis.


## Configuration Requise

- Node.js et npm doivent être installés sur votre système. Vous pouvez les télécharger depuis [le site officiel](https://nodejs.org/).

## Installation

### Frontend

1. Clonez ce dépôt Git sur votre machine locale :

```bash
git clone https://github.com/Ariel013/gozem.git

```

2. Accédez au répertoire du projet :
   cd gozem
   
3. Effectuez la commande suivante dans les differents dossiers: 
   frontend && backend
   
   npm install

4. Créez un fichier .env à la racine du projet et configurez les variables d'environnement requises.

# Configuration des Variables d'Environnement

Pour faire fonctionner correctement l'application, vous devez configurer les variables d'environnement suivantes dans le fichier .env :

- PORT : Le port sur lequel le serveur doit écouter (par exemple, 3000).

- DATABASE_URL : L'URL de votre base de données (par exemple, mongodb://localhost/nom-de-la-base).

- JWT_SECRET : La clé secrète pour la génération de jetons JWT.

- FRONT_URL : L'URL de l'interface utilisateur front-end.


#  Lancement de l'Application


1. Exécutez le frontend en utilisant la commande suivante :
   
   ng serve

2. L'application sera accessible à l'adresse http://localhost:4200/ dans votre navigateur.

Pour le backend, exécutez la commande suivante :
    npm run dev ou npm start

Le backend sera accessible à l'adresse http://localhost:5000/.

# Utilisation


L'application comprend les fonctionnalités suivantes :

Ajout de livraisons en utilisant l'ID du colis.
Mise à jour de l'état des livraisons par les livreurs.
Vérification de l'authentification des utilisateurs à l'aide de tokens JWT.
...
Authentification et Autorisation
L'application utilise des tokens JWT pour l'authentification. Un gardien (guard) d'authentification a été mis en place pour vérifier l'authentification de l'utilisateur. De plus, un gardien d'administration est utilisé pour limiter l'accès aux utilisateurs ayant le rôle d'administrateur.

# Contribution


Si vous souhaitez contribuer à ce projet, veuillez suivre ces étapes :

Forkez le projet.
Créez une branche pour votre fonctionnalité : git checkout -b feature/ma-nouvelle-fonctionnalite.
Commencez à coder !
Créez une demande d'extraction (Pull Request) lorsque votre fonctionnalité est prête.


Nous espérons que cette application vous sera utile. N'hésitez pas à contribuer, signaler des problèmes ou proposer des améliorations. Bon codage !