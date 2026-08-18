import 'dotenv/config';

const cognodbUri = process.env.COGNODB_URI?.trim();

export const env = {
  port: Number(process.env.PORT || 5001),
  nodeEnv: process.env.NODE_ENV || 'development',
  cognodbUri: cognodbUri || 'bolt://localhost:7687',
  cognodbUsername: process.env.COGNODB_USERNAME?.trim() || 'neo4j',
  cognodbPassword: process.env.COGNODB_PASSWORD?.trim() || 'neo4j',
  cognodbDatabase: process.env.COGNODB_DATABASE?.trim() || 'neo4j',
  clientOrigin: process.env.CLIENT_ORIGIN || 'http://localhost:5173'
};
