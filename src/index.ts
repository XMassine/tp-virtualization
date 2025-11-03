import { helloWorld } from './hello-world';
const greet = helloWorld();
console.log(greet);


import http from 'http';
import {server} from './fonctions';
// Création et démarrage du serveur
const PORT = 8000;
const servr = server;
servr.listen(PORT, () => {
  console.log(`✅ Serveur démarré sur http://localhost:${PORT}`);
});
//coment 2