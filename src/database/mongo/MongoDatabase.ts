import mongoose from 'mongoose';
import IDatabase from '../interfaces/IDatabase';
import availableModels from '../../models/index';
import { Post, User } from '../../models';

class MongoDatabase implements IDatabase {
  private uri: string;
  public models: { [key: string]: any } = {};

  protected connection: any
  constructor(uri: string) {
    this.uri = uri;
  }

  loadModels() {
    // This could be done reading a directory and assigning the models from the filesystem
    this.models = {
      [availableModels.post]: Post,
      [availableModels.user]: User,
    }
  }
  public getModel<T>(model: string): T {
    return this.models[model]
  }
  getConnection() {
    return this.connection
  }
  async connect(): Promise<void> {
    try {
      await mongoose.connect(this.uri);
      this.connection = mongoose.connection
    } catch (error) {
      console.error("Error connecting to database: ", error);
      throw new Error("Database connection failed.");
    }
  }

  async disconnect(): Promise<void> {
    try {
      await mongoose.disconnect();
      console.log("Disconnected from database.");
    } catch (error) {
      console.error("Error disconnecting from database: ", error);
      throw new Error("Database disconnection failed.");
    }
  }


}

export default MongoDatabase;
