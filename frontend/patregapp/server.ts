import express from 'express';
import { fileURLToPath } from 'node:url';
import { dirname, join, resolve } from 'node:path';
import bootstrap from './src/main.server';
import { APP_BASE_HREF } from '@angular/common';
import cors from 'cors'; // Import CORS middleware
import { CommonEngine } from '@angular/ssr'; // Import Angular SSR engine

// The Express app is exported so that it can be used by serverless Functions.
export function app(): express.Express {
  const server = express();
  const port = 5055; // Set your backend port to 5055 (or whatever you want)
  const serverDistFolder = dirname(fileURLToPath(import.meta.url));
  const browserDistFolder = resolve(serverDistFolder, '../browser');
  const indexHtml = join(serverDistFolder, 'index.server.html');

  const commonEngine = new CommonEngine();

  // Enable CORS for all routes (you can specify origins if you want more control)
  // server.use(cors({
  //   origin: 'http://localhost:4200', // Allow your frontend URL here
  //   methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'], // Allow specific HTTP methods
  //   allowedHeaders: ['Content-Type', 'Authorization'], // Allow specific headers
  //   credentials: true // Allow credentials (cookies, etc.) if necessary
  // }));

  // Handle preflight requests (OPTIONS)
 // server.options('*', cors()); // Enable preflight CORS for all routes

  server.set('view engine', 'html');
  server.set('views', browserDistFolder);

  // Serve static files from /browser
  server.get('**', express.static(browserDistFolder, {
    maxAge: '1y',
    index: 'index.html',
  }));

  // All regular routes use the Angular engine for SSR
  server.get('**', (req, res, next) => {
    const { protocol, originalUrl, baseUrl, headers } = req;

    commonEngine
      .render({
        bootstrap,
        documentFilePath: indexHtml,
        url: `${protocol}://${headers.host}${originalUrl}`,
        publicPath: browserDistFolder,
        providers: [{ provide: APP_BASE_HREF, useValue: baseUrl }],
      })
      .then((html: string) => res.send(html))  // Explicitly define `html` as `string`
      .catch((err: Error) => next(err));       // Explicitly define `err` as `Error`
  });

  return server;
}

function run(): void {
  const port = process.env['PORT'] || 4000; // You can keep this for flexibility

  // Start up the Node server
  const server = app();
  server.listen(port, () => {
    console.log(`Node Express server listening on http://localhost:${port}`);
  });
}

run();
