/**
 * Mini API HTTP avec Node.js + TypeScript
 * Testable avec :
 *   curl http://localhost:8000
 *   curl http://localhost:8000/api/v1/sysinfo
 */

import http from 'http';
import os from 'os';

const getSystemInfo = () => ({
  hostname: os.hostname(),
  platform: os.platform(),
  release: os.release(),
  uptime: os.uptime(),
  nodeVersion: process.version,
  currentTime: new Date().toISOString(),
});

export const requestHandler = (req: http.IncomingMessage, res: http.ServerResponse) => {
  if (!req.url) return;

  if (req.url === '/') {
    res.writeHead(200, { 'Content-Type': 'text/plain' });
    res.end('Bienvenue sur la mini API !');
  } else if (req.url === '/api/v1/sysinfo') {
    res.writeHead(200, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify(getSystemInfo(), null, 2));
  } else {
    res.writeHead(404, { 'Content-Type': 'text/plain' });
    res.end('Erreur 404 : ressource non trouvée.');
  }
};

export const server = http.createServer(requestHandler);

if (require.main === module) {
  server.listen(8000, () => {
    console.log('✅ Serveur lancé sur http://localhost:8000');
  });
}

