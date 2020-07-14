## Documentation

### Informations

Ceci est un gestionnaire de bookmarks réalisé en ReactJS. Il permet de renseigner des url provenant des sites vimeo et flickr uniquement. Le format des url accepté est :
http://www.flickr.com/photos/*
https://www.flickr.com/photos/*
http://www.vimeo.com/*
https://www.vimeo.com/*

exemples : 
https://vimeo.com/59856566
https://vimeo.com/435789152
http://www.flickr.com/photos/bees/2341623661/
https://www.flickr.com/photos/gsfc/50102892582/in/explore-2020-07-13/

Les bookmarks sont gardés grâce au LocalStorage, il seront donc toujours présent avec un rechargement de page.

### Récupération du projet

Il suffit pour ce projet de récupérer les fichiers via la manipulation normale
-> Page principale du projet -> bouton Code -> Clone with HTTPS/Download ZIP
Un fois les fichiers récupérés, en se plaçant dans le répertoire "projet" :

#### `npm start`

Cela ouvre l'application sur le navigateur par défaut à l'adresse [http://localhost:3000](http://localhost:3000).

### Manque

Les mots-clés sont actifs, il est possible d'en ajouter et de les supprimer, il n'est pas possible de les modifier. Cependant, à la différence des url, il ne sont pas gardés localement, donc avec un rechargement de la page, ils disparaissent.
En utilisant oEmbed via Flickr, le json récupéré ne propose pas de date d'ajout, les informations concernant cette colonne ne sont donc pas présentes pour les images provenant de Flickr. Je n'ai malheureusement pas trouvé de moyen de récupérer les informations d'une image seule en utilisant l'api fournie.
