const DI_TYPES = {
  DataService: Symbol.for('DataService'),
  Database: Symbol.for('Database'),
  Logger: Symbol.for('Logger>'),
  PostService: Symbol.for('PostService'),
  UserService: Symbol.for('UserService')
};

export default DI_TYPES;
