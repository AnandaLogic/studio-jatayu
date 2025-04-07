import { APP_BASE_HREF } from '@angular/common';
import { renderApplication } from '@angular/platform-server';
import { AppComponent } from './app.component';
import { appConfig } from './app.config';
import { ApplicationRef } from '@angular/core';

export async function createApp() {
  return {
    async render(req: any, res: any) {
      const html = await renderApplication(() => Promise.resolve(AppComponent as unknown as ApplicationRef), {
        document: '<app-root></app-root>',
        url: req.url,
        platformProviders: [
          { provide: APP_BASE_HREF, useValue: '/' }
        ]
      });

      res.writeHead(200, { 'Content-Type': 'text/html' });
      res.end(html);
    }
  };
}
