import mongoose from 'mongoose';

export const connect = async () => {
  try {
    mongoose.connect(process.env.MONGO_URL!);
    const connection = mongoose.connection;

    connection.on('connected', () => {
      console.log('MongoDB connected sucesss!!');
    });

    connection.on('error', (err) => {
      console.log(`Some error occurred... ${err}`);
    });
  } catch (error) {
    console.log(`Something went wrong... ${error}`);
  }
};
