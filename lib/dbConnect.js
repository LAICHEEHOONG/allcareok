
import mongoose from 'mongoose';

const MONGODB_URI = process.env.MONGODB_URI;

if (!MONGODB_URI) {
  throw new Error(
    'Please define the MONGODB_URI environment variable inside .env.local'
  );
}

/**
 * Global is used to preserve the Mongoose connection across hot-reloads in development.
 * This prevents connections growing exponentially during API Route usage.
 */
let cached = global.mongoose;

if (!cached) {
  cached = global.mongoose = { conn: null, promise: null };
}

async function dbConnect() {
  if (cached.conn) {
    return cached.conn;
  }

  if (!cached.promise) {
    cached.promise = mongoose.connect(MONGODB_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    }).then((mongoose) => {
      return mongoose;
    });
  }
  cached.conn = await cached.promise;
  return cached.conn;
}

export default dbConnect;

// import mongoose from 'mongoose';

// if (!process.env.MONGODB_URI) {
//   throw new Error('No MONGODB_URI environment variable set');
// }

// let cache = { connection: null, promise: null };

// async function dbConnect() {
//   if (cache.connection) {
//     console.log('Using cached database connection');
//     return cache.connection;
//   }

//   if (!cache.promise) {
//     console.log('Creating new database connection promise');
//     cache.promise = mongoose.connect(process.env.MONGODB_URI, {
//       useNewUrlParser: true,
//       useUnifiedTopology: true,
//     });
//   }

//   try {
//     cache.connection = await cache.promise;
//     console.log('Database connection established');
//   } catch (error) {
//     console.error('Database connection error:', error);
//     cache.promise = null;
//     throw error;
//   }

//   return cache.connection;
// }

// export default dbConnect;




