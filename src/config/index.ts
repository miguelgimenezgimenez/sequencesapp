const pe = process.env;
export const NODE_ENV = (pe.NODE_ENV as Environment) || 'development';
export const MONGO_URI: string = process.env.MONGO_URI || 'mongodb://127.0.0.1:27017/mern-stack';

export const PORT: number = Number(process.env.PORT) || 3000;
type Environment = 'development' | 'production' | 'test';


export const SECRET_KEY = pe.SECRET_KET || "donttellanyone please"

if (NODE_ENV === "production" && !pe.SECRET_KEY) {
  throw new Error('Please provide SECRET_KEY environment variable!');
}

export const JWT_ACCESS_TOKEN_LIFETIME = pe.JWT_ACCESS_TOKEN_LIFETIME || '2d';

// Client

export const CLOUDINARY_CLOUD_NAME = pe.CLOUDINARY_CLOUD_NAME || "ddwfa5rky"
export const CLOUDINARY_API_KEY = pe.CLOUDINARY_API_KEY || "584956838227712"
export const CLOUDINARY_API_SECRET = pe.CLOUDINARY_API_SECRET || "F2H9hdYF1Llpg09alDE3ghUaZpU"

export const CLIENT_ORIGIN = pe.CLIENT_ORIGIN || `http://localhost:8000`;


export const SALT_ROUNDS = Number(pe.SALT_ROUNDS) || 10;

