import  mongoose   from 'mongoose'

const productSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required: [true, 'price must be provided'],
  },
  featured: {
    type: Boolean,
    default: false,
  },
  rating: {
    type: Number,
    default: 4.8,
  },
  img: [String], 
  createdAt: {
    type: Date,
    default: Date.now(),
  },
  company: {
    type: String,
    enum: {
      values: ['apple', 'svmsung', 'dell', 'nokia', 'lenovo','realme'],
      message: `{VALUE} is not supported`,
    },
  },
});

const  productModel = mongoose.model('Product', productSchema);

export default productModel;
