import { connect } from 'mongoose';

export async function connectDB() {
  try {
    const conn = await connect(process.env.MONGO_URI);
    console.log(`MongoDB Connected to ${conn.connection.host}`);
  } catch (error) {
    console.error(error);
    process.exit(1);
  }
}
