import { Router } from 'express';

export interface IAppRouter {
  createRouter(): Router;
  getPath(): string;
}

export abstract class BaseRouter implements IAppRouter {
  private path: string
  constructor(private dirname: string) {
    const lastSlashIndex = dirname.lastIndexOf('/'); // if no slash index = -1
    this.path = dirname.slice(lastSlashIndex + 1);
  }

  createRouter(): Router {
    throw new Error('Method not implemented.');
  }

  getPath(): string {
    return this.path;
  }
}
