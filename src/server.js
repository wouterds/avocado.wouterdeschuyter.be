//@flow
declare var __dirname: any;
import fs from 'fs';
import path from 'path';
import Express, { Request, Response } from 'express';
import React from 'react';
import type { Node } from 'react';
import { renderToString } from 'react-dom/server';
import { StaticRouter } from 'react-router-dom';
import App from 'app';

class Server {
  app: Express;
  template: string;

  constructor(port: number) {
    this.app = new Express();

    this.loadTemplate();
    this.setupMiddlewares();
    this.setupRoutes();

    this.app.listen(port);
  }

  loadTemplate() {
    this.template = fs.readFileSync(path.resolve('./build/index.html'), 'utf8');
  }

  setupMiddlewares() {
    this.app.use('/static', this.staticMiddleware);
  }

  setupRoutes() {
    this.app.get('/*', this.handleWildcardRequest);
  }

  renderTemplate = (node: Node): string => {
    let html;

    // Render component
    html = renderToString(node);

    // Render component in template
    html = this.template.replace('<!-- content -->', html);

    // Remove newlines from html
    html = html.replace(/\n/g, '');

    return html;
  };

  get staticMiddleware() {
    return Express.static(path.resolve('./build/static'));
  }

  handleWildcardRequest = (request: Request, response: Response): Response => {
    console.log(request.url);

    return response.send(
      this.renderTemplate(
        <StaticRouter location={request.url} context={{}}>
          <App />
        </StaticRouter>,
      ),
    );
  };
}

new Server(3000);
