const Product = require('../models/product');


const uploadImage = async (req, res) => {
	try {
		const file = req.file;
		if (!file) {
			return res.status(400).json({ message: 'No file uploaded', success: false });
		}

		return res.status(200).json({
			message: 'File uploaded successfully',
			success: true,
			imageUrl: `${process.env.BACKEND_DOMAIN}/${file.filename}`,
			imageName: file.filename,
		});

	} catch (error) {
		console.error('Error uploading image:', error);
		return res.status(500).json({ message: 'Internal server error', success: false });
	}
}

const createProduct = async (req, res) => {
  try {
    const {
      title,
      price,
      image,
      description,
      colors,
      sizes,
      details,
      stock,
      gender,
      category,
      subCategory,
      subCategoryChild,
      isDealActive,
      discountPrice
    } = req.body;

    // Required field validation
    const requiredFields = { title, price, stock, category };
    for (const [key, value] of Object.entries(requiredFields)) {
      if (!value) {
        return res.status(400).json({ 
          message: `Missing required field: ${key}`, 
          success: false 
        });
      }
    }

    // Validate numeric fields
    if (price < 0 || stock < 0 || (discountPrice && discountPrice < 0)) {
      return res.status(400).json({ 
        message: 'Price, stock, and discountPrice must be non-negative', 
        success: false 
      });
    }

    // Validate arrays
    if (colors && !Array.isArray(colors)) {
      return res.status(400).json({ 
        message: 'Colors must be an array', 
        success: false 
      });
    }
    if (sizes && !Array.isArray(sizes)) {
      return res.status(400).json({ 
        message: 'Sizes must be an array', 
        success: false 
      });
    }
    if (gender && !Array.isArray(gender)) {
      return res.status(400).json({ 
        message: 'Gender must be an array', 
        success: false 
      });
    }

    // Extract image name (remove any domain or path, keep only filename)
    let imageName = '';
    if (image) {
      imageName = image.split('/').pop(); // Get only the filename from the image URL or path
    }

    // Create new product
    const newProduct = new Product({
      title,
      price,
      image: imageName, // Store only the image name
      description: description || '',
      colors: colors || [],
      sizes: sizes || [],
      details: details || {
        brand: '',
        material: '',
        condition: '',
        colors: '',
        sizes: ''
      },
      stock,
      gender: gender || [],
      category,
      subCategory: subCategory || '',
      subCategoryChild: subCategoryChild || '',
      isDealActive: isDealActive || false,
      discountPrice: discountPrice || undefined,
      usersThatLiked: [],
      usersThatRated: [],
      totalLikes: 0,
      totalRatings: {
        totalUsers: 0,
        averageRating: 0
      },
      totalSales: 0
    });

    // Save product to database
    await newProduct.save();

    // Format response
    const productResponse = newProduct.toObject();
		productResponse.image = `${process.env.BACKEND_DOMAIN}/${newProduct.image}`

    return res.status(201).json({
      message: 'Product added successfully',
      success: true,
      product: productResponse
    });

  } catch (error) {
    console.error('Error adding product:', error);
    return res.status(500).json({ 
      message: 'Internal server error', 
      success: false 
    });
  }
};

module.exports = {
  createProduct,
	uploadImage,
};