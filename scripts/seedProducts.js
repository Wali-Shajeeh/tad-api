const mongoose = require('mongoose');
const Product = require('../models/product'); // Change path if needed
const { faker } = require('@faker-js/faker');

// ✅ MongoDB connection
mongoose
  .connect('mongodb+srv://walishajeeh26:Tad110@cluster0.9u0nu.mongodb.net', { })
  .then(() => {
    console.log('MongoDB connected');
    seedProducts();
  })
  .catch((err) => console.error('MongoDB connection error:', err));


  const images = [
    '/p_img1.png', '/p_img2_1.png', '/p_img2_2.png', '/p_img2_3.png', '/p_img2_4.png',
    '/p_img3.png', '/p_img4.png', '/p_img5.png', '/p_img6.png', '/p_img7.png',
    '/p_img8.png', '/p_img9.png', '/p_img10.png', '/p_img11.png', '/p_img12.png',
    '/p_img13.png', '/p_img14.png', '/p_img15.png', '/p_img16.png', '/p_img17.png',
    '/p_img18.png', '/p_img19.png', '/p_img20.png', '/p_img21.png', '/p_img22.png',
    '/p_img23.png', '/p_img24.png', '/p_img25.png', '/p_img26.png', '/p_img27.png',
    '/p_img28.png', '/p_img29.png', '/p_img30.png', '/p_img31.png', '/p_img32.png',
    '/p_img33.png', '/p_img34.png', '/p_img35.png', '/p_img36.png', '/p_img37.png',
    '/p_img38.png', '/p_img39.png', '/p_img40.png', '/p_img41.png', '/p_img42.png',
    '/p_img43.png', '/p_img44.png', '/p_img45.png', '/p_img46.png', '/p_img47.png',
    '/p_img48.png', '/p_img49.png', '/p_img50.png', '/p_img51.png', '/p_img52.png',
  ];
  
  const colors = ['Black', 'White', 'Red', 'Blue', 'Green', 'Yellow', 'Grey', 'Pink'];
  const sizesClothing = ['S', 'M', 'L', 'XL', 'XXL'];
  const sizesShoes = ['6', '7', '8', '9', '10', '11'];
  
  async function seedProducts() {
    try {
      await Product.deleteMany();
  
      const products = [];
  
      for (let i = 0; i < 50; i++) {
        const category = faker.helpers.arrayElement(['clothing', 'shoes']);
        const isDealActive = faker.datatype.boolean();
        const price = faker.number.int({ min: 1000, max: 10000 });
        const discountPrice = isDealActive
          ? price - faker.number.int({ min: 100, max: 500 })
          : undefined;
  
        const product = new Product({
          title: faker.commerce.productName(),
          price: price,
          discountPrice: discountPrice,
          image: faker.helpers.arrayElement(images),
          description: faker.commerce.productDescription(),
  
          colors: Array.from({ length: 3 }).map(() => ({
            color: faker.helpers.arrayElement(colors),
            displayName: faker.color.human(),
          })),
  
          sizes: category === 'clothing'
            ? sizesClothing.map(size => ({ size, displayName: size }))
            : sizesShoes.map(size => ({ size, displayName: size })),
  
          details: {
            brand: faker.company.name(),
            material: faker.commerce.productMaterial(),
            condition: faker.helpers.arrayElement(['New', 'Used - Like New', 'Refurbished']),
            colors: colors.join(', '),
            sizes: (category === 'clothing' ? sizesClothing : sizesShoes).join(', '),
          },
  
          stock: faker.number.int({ min: 10, max: 200 }),
          gender: [faker.helpers.arrayElement(['Men', 'Women', 'Kids'])],
  
          category: category,
          subCategory: category === 'clothing'
            ? faker.helpers.arrayElement(['Topwear', 'Bottomwear', 'Winterwear'])
            : faker.helpers.arrayElement(['Sneakers', 'Boots', 'Sandals']),
  
          subCategoryChild: faker.commerce.department(),
  
          isDealActive: isDealActive,
  
          usersThatLiked: [],
          usersThatRated: [],
          totalLikes: 0,
          totalRatings: { totalUsers: 0, averageRating: 0 },
          totalSales: faker.number.int({ min: 0, max: 100 }),
        });
  
        products.push(product);
      }
  
      await Product.insertMany(products);
      console.log('✅ Products seeded successfully!');
      process.exit();
    } catch (error) {
      console.error('❌ Error seeding products:', error);
      process.exit(1);
    }
  }