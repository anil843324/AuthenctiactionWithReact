import  mongoose  from  "mongoose"

mongoose.set('strictQuery', false);

const connectDB = (uri) => {
  console.log('Connect DB');
  return mongoose.connect(uri, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });
};


export default connectDB