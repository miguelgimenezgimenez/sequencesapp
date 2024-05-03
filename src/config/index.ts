const pe = process.env;
export const NODE_ENV = (pe.NODE_ENV as Environment) || 'development';
export const MONGO_DB_URI: string =
  process.env.MONGO_DB_URI || 'mongodb://127.0.0.1:27017/sequences';

export const PORT: number = Number(process.env.PORT) || 3000;
type Environment = 'development' | 'production' | 'test';

export const SECRET_KEY = pe.SECRET_KET || 'donttellanyone please';

if (NODE_ENV === 'production' && !pe.SECRET_KEY) {
  throw new Error('Please provide SECRET_KEY environment variable!');
}

export const JWT_ACCESS_TOKEN_LIFETIME = pe.JWT_ACCESS_TOKEN_LIFETIME || '10m';

export const CLIENT_ORIGIN = pe.CLIENT_ORIGIN || `http://localhost:8000`;

export const SALT_ROUNDS = Number(pe.SALT_ROUNDS) || 10;
