const mongoose = require('mongoose');

const connectDB = async () => {
  try {
    const mongoURI = process.env.MONGO_URI || "mongodb+srv://th213815_db_user:92Lh6yih8oXeSnSV@takwa.qetdjiu.mongodb.net/souq_db?retryWrites=true&w=majority";
    const conn = await mongoose.connect(mongoURI);
    console.log(`MongoDB Connected: ${conn.connection.host}`);
  } catch (err) {
    console.error('DB Connection Failed:', err.message);
    process.exit(1);
  }
};

module.exports = connectDB;