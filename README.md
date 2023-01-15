# covid_fullstack
Depot pour le cours de fullstack


Participants :
- Nicolas PIQUARD 31803921
- Thomas GARETTE 31815728

## Fonctionnement de l'application

L'application est composé de deux parties: Front et Back.

Pour lancer l'application, il faut d'abord compiler et lancer ces deux parties.
Pour le back : dans le dossier "covid-api", lancer un terminal et taper la commande "./gradlew build" pour compiler, 
  puis "java -jar ./build/libs/covid-api.jar" pour lancer le back.
  
Pour le front : dans le dossier "angular", lancer un terminal et taper la commande "ng serve" pour lancer le front.

## Remplissage de la base de données:

### Table VaccinationCenter
INSERT INTO vaccination_center (id_vaccination_center,adresse, city, name, postal_code) VALUES ('1', '1 Rue du bambou', 'Nancy', 'Centre 1', '54000');
<br/>INSERT INTO vaccination_center (id_vaccination_center,adresse, city, name, postal_code) VALUES ('2', '6 Rue du général leclerc', 'Nancy', 'Centre 2', '54000');
<br/>INSERT INTO vaccination_center (id_vaccination_center,adresse, city, name, postal_code) VALUES ('3', '6 Rue d ailleurs', 'Metz', 'Centre 3', '57000');
<br/>INSERT INTO vaccination_center (id_vaccination_center,adresse, city, name, postal_code) VALUES ('4', '0 Rue de nulle-part', 'Metz', 'Centre 4', '57000');

### Table Utilisateur
insert into utilisateur (id, login, password, role) values ('1', 'toto', '$2a$10$wH0ILGDmmXAZi7CU9.akleJ2xYdGAAnQ9hWouviM13GC4G6Oz0S3y', 'Admin')
<br/>insert into utilisateur (id, login, password, role) values ('2', 'titi', '$2a$10$yDajd8PAsi/2sZH7gbdn4OeBBWW3moZYXxZWbOcA0QUhAoxNYiVtK', 'Patient')

### Table Doctor
INSERT INTO doctor (id_doctor, name, mail, telephone, login, password, role) VALUES ('1', 'David Manuel', 'davidmanuel@gmail.com', '06666666', 'toto', '$2a$10$wH0ILGDmmXAZi7CU9.akleJ2xYdGAAnQ9hWouviM13GC4G6Oz0S3y');

### Table Patient
INSERT INTO patient (id_patient, birth_date, fullname, lastname, mail, telephone, login, password) VALUES ('1', '01/04/2000', 'toto', 'titi','tititoto@gmail.com','0778987562', 'titi', '$2a$10$yDajd8PAsi/2sZH7gbdn4OeBBWW3moZYXxZWbOcA0QUhAoxNYiVtK');

ps: Les mots de passe doivent être stockés avec un chiffrement BCrypt
 
|  | **Utilisateur 1** | **Utilisateur 2** |
| --- | --- | --- |
| **login** | toto | titi |
| **password** | toto | titi |
| **rôle** | Admin | Patient |
| **type** | Docteur | Patient |



## Détail de fonctionnement

Le back est accessible via l'adresse suivante : http://localhost:8080/
<br/>Le front est accessible via l'adresse suivante : http://localhost:4200/

Pour utiliser l'application, il faut se connecter à la fois sur le back (popup) et le front (sur la page /login).
<br/>-> Il est plus simple pour tester la connexion de plusieurs profils via un navigateur en navigation privée.

Une fois connecté aux deux, vous arriverez sur la page /centers qui liste tous les centres.
<br/>Vous pouvez effectuer une recherche de centre par ville pour réduire la liste.
<br/>Vous pouvez ensuite afficher les détails du centre en cliquant dessus.
<br/>Une fois le centre sélectionné, vous pouvez prendre rendez-vous en cliquant sur le bouton.

La page /détails du centre sélectionné s'ouvre, il faut ensuite sélectionner la date du rendez-vous et cliquer sur le bouton.
<br/>Pour retourner sur la page précédente, il faut appuyer sur le bouton retour en haut à droite de la page.
<br/><!>Il ne faut pas naviguer via l'URL ou rafraichir la page car pour une raison inconnue, cela annule la connexion de l'utilisateur.<!>

### Page admin
Une page admin est disponible et est réservée aux utilisateurs ayant comme rôle "Admin" dans la bdd.
<br/>Cette page permet de visualiser la liste des docteurs et la liste des patients.
<br/>Le verrouillage de la page est effectué à l'aide d'un guard implémentant CanActivate.
<br/>Une amélioration serait de modifier les entités de la manière suivante :
- Lier un docteur à un centre de vaccination, créer un administrateur de centre qui aurait accès à la liste des docteurs de son centre sur sa page admin. La page admin du docteur contiendrait la liste des rendez-vous de son centre.
- Créer un compte admin suprême qui aurait la liste de toutes les entités et pourrait les supprimer.

Par manque de temps et de capacité, il n'a pas été possible de réaliser ces modifications.

### Création de compte
Il était envisagé de créer une page dédiée à la création de comptes :
- Une page libre d'accès à tous pour la création de compte patient.
- Une page limitée aux administrateurs de centre et plus pour créer des comptes docteur.
- Une page limitée aux administrateurs plus pour créer des comptes d'administrateur de centre et pour créer des centres.

### Fonctionnalités spéciales
- Une métrique a été ajoutée mais elle n'est pas utilisée.
- Le micrometer n'a pas été configuré.
- Un Token Bucket a été mis en place mais uniquement sur les requêtes sur la page /centers et sur la navigation d'une page à une autre.
- Une fois le Bucket vide, une redirection s'effectue sur la page /waiting avec un compte à rebours.
- Une fois le compte à rebours terminé, la redirection s'effectue sur la page /centers.
- La gestion des Etags n'a pas été effectuée

## Mise en production
Un DockerFile est présent au sein du projet, dans le dossier du Back.
Il permet la conteneurisation de la partie Back pour une compilation et un lancement de celui-ci dans un environnement stable.

### Fonctionnement du DockerFile
On utilise deux environnements différents :
- openjdk:17-oracle qui sert de compilateur
- openjdk:17-oracle qui sert de lanceur (dans l'idée seule une jre est nécessaire mais à cause d'un problème de compatibilité nous avons réutilisé une jdk)

Dans le 1er, les fichiers du projet sont copiés puis sont compilés dans un .jar en lançant la commande "gradlew build" qui effectue la compilation du projet gradle.
Dans le 2nd, le fichier jar est copié et executé.
