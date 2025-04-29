const multer = require("multer");
const path = require("path");

// Configure multer storage
const storage = multer.diskStorage({
	destination: (req, file, cb) => {
		cb(null, path.join(__dirname, '../public')); // Save to public/uploads
	},
	filename: (req, file, cb) => {
		const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
		const ext = path.extname(file.originalname).toLowerCase();
		cb(null, `product-${uniqueSuffix}${ext}`); // e.g., product-123456789.jpg
	},
});

// File filter to accept only images
const fileFilter = (req, file, cb) => {
	const allowedTypes = ['image/jpeg', 'image/png', 'image/jpg', 'image/gif', 'image/webp'];
	if (allowedTypes.includes(file.mimetype)) {
		cb(null, true);
	} else {
		cb(new Error('Only JPEG and PNG images are allowed'), false);
	}
};

// Multer middleware for single image upload
const upload = multer({
	storage,
	fileFilter,
	limits: { fileSize: 5 * 1024 * 1024 }, // 5MB limit
})

module.exports = upload;