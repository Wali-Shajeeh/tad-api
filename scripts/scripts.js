const mongoose = require('mongoose');
const Product = require('../models/product')
const User = require('../models/user')
const Order = require('../models/order')


// 1. Connect to MongoDB
mongoose.connect('mongodb+srv://walishajeeh26:Tad110@cluster0.9u0nu.mongodb.net', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => console.log('Connected to MongoDB'))
.catch(err => console.error('MongoDB connection error:', err));

// 2. Define your Product schema and model


// 3. Main function to update images
async function updateProductImages() {
  try {
    const products = await Product.find({}); // Fetch all products

    for (let product of products) {
      if (product.image && product.image.startsWith('/')) {
        const cleanedImageName = product.image.replace('/', ''); // remove ./
        
        // Update the image URL
        const updatedImageUrl = `${cleanedImageName}`;

        // Set new image URL
        product.image = updatedImageUrl;

        // Save the updated product
        await product.save();
        console.log(`Updated product ${product._id}: ${updatedImageUrl}`);
      }
    }

    console.log('✅ All product images updated.');
    mongoose.disconnect();
  } catch (error) {
    console.error('Error updating products:', error);
    mongoose.disconnect();
  }
}

// 4. Run the function
updateProductImages();
