## Documentation

### Informations

Ceci est un gestionnaire de bookmarks réalisé en ReactJS. Il permet de renseigner des url provenant des sites vimeo et flickr uniquement. <br/>
/!\ Le format des url accepté est : <br/>
http://www.flickr.com/photos/* <br/>
https://www.flickr.com/photos/* <br/>
http://www.vimeo.com/* <br/>
https://www.vimeo.com/* 

exemples : <br/>
https://vimeo.com/59856566 <br/>
https://vimeo.com/435789152 <br/>
http://www.flickr.com/photos/bees/2341623661/ <br/>
https://www.flickr.com/photos/gsfc/50102892582/in/explore-2020-07-13/ 

Une regex a été mise en place pour pallier à ce problème, mais n'étant pas certain du fonctionnement parfait de cette regex et au risque de faire planter l'application à cause d'un json défectueux, merci de respecter ces formats d'url. 

Les bookmarks sont gardés grâce au LocalStorage, il seront donc toujours présent avec un rechargement de page.

### Récupération du projet

Il suffit pour ce projet de récupérer les fichiers via la manipulation normale <br/>
-> Page principale du projet -> bouton Code -> Clone with HTTPS/Download ZIP <br/>
Un fois les fichiers récupérés, en se plaçant dans le répertoire "projet" :

#### `npm start`

Cela ouvre l'application sur le navigateur par défaut à l'adresse [http://localhost:3000](http://localhost:3000).

### Manque

Les mots-clés sont actifs, il est possible d'en ajouter et de les supprimer, il n'est pas possible de les modifier. Cependant, à la différence des url, il ne sont pas gardés localement, donc avec un rechargement de la page, ils disparaissent. <br/>
En utilisant oEmbed via Flickr, le json récupéré ne propose pas de date d'ajout, les informations concernant cette colonne ne sont donc pas présentes pour les images provenant de Flickr. Je n'ai malheureusement pas trouvé de moyen de récupérer les informations d'une image seule en utilisant l'api fournie.

### PROBLEMES 17h30 14/07

Le problème rencontré provient de la requête provenant de Flickr. <br/>
- Utilisant un proxy "https://cors-anywhere.herokuapp.com", les requêtes sont limitées à 200 par heures, une fois ce nombre de requête dépassé, un problème de récupération du json se pose et le "Data Loading..." tourne en boucle. <br/>


#### PATCH

Pour clear le localStorage et éviter de garder les erreurs provenant du problème cité ci-dessus, un patch consiste à commenter la ligne dans App.js/l.16 (this.loadLocalStorage();), enregistrer, renseigner un nouveau bookmark, décommenter la ligne précédente, enregister. Cela aura pour effet de reset le LocalStorage avec le nouveau bookmark. <br/>
Le fix le plus évident serait de corriger le problème énoncé ci-dessus.