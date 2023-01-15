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
insert into utilisateur (id, login, password) values ('1', 'toto', '$2a$10$wH0ILGDmmXAZi7CU9.akleJ2xYdGAAnQ9hWouviM13GC4G6Oz0S3y')
<br/>insert into utilisateur (id, login, password) values ('2', 'titi', '$2a$10$yDajd8PAsi/2sZH7gbdn4OeBBWW3moZYXxZWbOcA0QUhAoxNYiVtK')

### Table Doctor
INSERT INTO doctor (id_doctor, name, mail, telephone, login, password) VALUES ('1', 'David Manuel', 'davidmanuel@gmail.com', '06666666', 'toto', '$2a$10$wH0ILGDmmXAZi7CU9.akleJ2xYdGAAnQ9hWouviM13GC4G6Oz0S3y');

### Table Patient
INSERT INTO patient (id_patient, birth_date, fullname, lastname, mail, telephone) VALUES ('1', '01/04/2000', 'toto', 'titi','tititoto@gmail.com','0778987562');
