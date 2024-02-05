import { globSync } from "glob";
import { connect } from "mongoose";

// Model auto Register.

globSync('./models/*.ts').forEach(file => require('@/' + file))

const connectDB = async () => {
  try {
    await connect('mongodb://localhost:27017/test')
    console.log('MongoDB connected')
  } catch (error) {
    setTimeout(() => {
      console.log('MongoDB reconnecting...')
      connectDB()
    }, 10 * 1000);
  }
}

export default connectDB