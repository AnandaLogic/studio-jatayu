import { renderApplication } from '@angular/platform-server';
import { bootstrapApplication } from '@angular/platform-browser';
import { AppComponent } from './src/app/app.component';
import { provideClientHydration } from '@angular/platform-browser';
import { provideRouter } from '@angular/router';
import { routes } from './src/app/app.routes';
import express, { Request, Response } from 'express';

const server = express();

server.get('*', async (req: Request, res: Response) => {
  try {
    const html = await renderApplication(() => bootstrapApplication(AppComponent, {
      providers: [
        provideClientHydration(),
        provideRouter(routes)
      ]
    }), {
      document: '<app-root></app-root>',
      url: req.url
    });

    res.send(html);
  } catch (error) {
    console.error('Error during SSR:', error);
    res.status(500).send('Internal Server Error');
  }
});

export const reqHandler = server;
