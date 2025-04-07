import { createServer } from 'http';
import { createApp } from './app/app.server';

const PORT = process.env['PORT'] || 4000;

createApp().then(app => {
  const server = createServer((req, res) => {
    app.render(req, res);
  });

  server.listen(PORT, () => {
    console.log(`Node Express server listening on http://localhost:${PORT}`);
  });
});
