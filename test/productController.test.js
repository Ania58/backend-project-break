const request = require('supertest');
const Product = require('../models/Product');
const app = require('../index');
const mongoose = require('mongoose');
const dotenv = require('dotenv');

dotenv.config();

let server;

jest.mock('../models/Product', () => ({
    create: jest.fn(), // Mocks Product model's create function to control behavior in tests
    find: jest.fn(), // Mock the find method here
    findById: jest.fn(),
    findByIdAndUpdate: jest.fn(),
    findByIdAndDelete: jest.fn()
  }));


  jest.mock('../middlewares/authMiddleware', () => (req, res, next) => {
    // Mocks middleware to skip authentication
    req.user = { id: 'testUserId' }; // Mocks auth middleware to simulate a logged-in user
    next(); // Skips real authentication
  });

beforeAll(async () => {
  await mongoose.connect(process.env.MONGO_URI); // Connects to MongoDB before tests run
  server = app.listen(0);// Starts the Express server on a random port
});

afterAll(async () => {
  await mongoose.connection.close(); // Closes the MongoDB connection after tests
  await new Promise(resolve => server.close(resolve)); // Stops the server
});

  
  describe('POST /dashboard', () => {
    afterEach(() => {
      jest.clearAllMocks(); // Clear mocks between tests
    });

    it('should create a new product and return it', async () => {
        const newProduct = {
            name: 'Test Product',
            description: 'Test Description',
            image: 'http://example.com/image.png',
            category: 'Test Category',
            size: 36,
            price: 20,
        };

        Product.create.mockResolvedValue(newProduct); // Simulates a successful product creation

        const response = await request(app).post('/dashboard').send(newProduct);// Sends POST request
        expect(response.status).toBe(302);// Expects a redirect status (302)

        const locationHeader = response.headers.location; //Extracts the Location header from the response, which contains the redirect URL.
        const expectedProductId = locationHeader.split('/').pop(); // Extracts product ID from URL

        expect(response.headers.location).toBe(`/dashboard/${expectedProductId}`); // Checks redirect URL

        expect(Product.create).toHaveBeenCalledWith(newProduct);  // Verifies Product.create was called
    });

    it('should return 400 if required fields are missing', async () => {
        const response = await request(app).post('/dashboard').send({}); // Missing fields, Sends empty request
        expect(response.status).toBe(400); // Expects bad request (400) for missing fields
        expect(response.body).toHaveProperty('message',"All fields are required");  // Checks error message
    });

    it('should return 500 if there is a server error', async () => {
        Product.create.mockRejectedValue(new Error('Internal Server Error')); // Simulates server error
    
        const newProduct = {
          name: 'Test Product',
          description: 'Test Description',
          image: 'http://example.com/image.png',
          category: 'Test Category',
          size: 36,
          price: 20,
        };
    
        const response = await request(app).post('/dashboard').send(newProduct); // Sends valid request
    
        expect(response.status).toBe(500); // Expects internal server error (500)
        expect(response.body).toHaveProperty('message', "There was a problem trying to create a product"); // Checks error message
      });
});



describe('GET / and GET /dashboard', () => {
    beforeAll(async () => {
      await mongoose.connect(process.env.MONGO_URI); // Connect to the database
    });
  
    afterAll(async () => {
      await mongoose.connection.close(); // Close the database connection
    });
  
    it('should fetch products and return HTML for the homepage', async () => {
      const mockProducts = [
        { name: 'Product 1', description: 'Description 1', image: 'http://example.com/image1.png' },
        { name: 'Product 2', description: 'Description 2', image: 'http://example.com/image2.png' },
      ];
  
      Product.find.mockResolvedValue(mockProducts); // Mock the find method to return mock products
  
      const response = await request(app).get('/'); // Make a GET request to the homepage
  
      expect(response.status).toBe(200); // Check for success status
      expect(response.text).toContain('Product 1'); // Check if the HTML contains product names
      expect(response.text).toContain('Product 2');
    });
  
    it('should fetch products and return HTML for the dashboard', async () => {
      const mockProducts = [
        { name: 'Product 3', description: 'Description 3', image: 'http://example.com/image3.png' },
      ];
  
      Product.find.mockResolvedValue(mockProducts); // Mock the find method to return mock products
  
      const response = await request(app).get('/dashboard'); // Make a GET request to the dashboard
  
      expect(response.status).toBe(200); // Check for success status
      expect(response.text).toContain('Product 3'); // Check if the HTML contains product names
    });
  
    it('should return 500 if there is an error fetching products', async () => {
      Product.find.mockRejectedValue(new Error('Database error')); // Mock the find method to throw an error
  
      const response = await request(app).get('/'); // Make a GET request to the homepage
  
      expect(response.status).toBe(500); // Check for internal server error status
      expect(response.body).toHaveProperty('message', "There was an error fetching the products"); // Check error message
    });
  });


  describe('GET /products/:id and GET /dashboard/:id', () => {
    afterEach(() => {
        jest.clearAllMocks(); // Clear mocks between tests
      });
    it('should return a product by ID from products', async () => {
        const product = {
            _id: '60c72b2f9b1d4c3f00123457',
            name: 'Test Product',
            description: 'Test Description',
            image: 'http://example.com/image.png',
            category: 'Test Category',
            size: 38,
            price: 20,
        };

        Product.findById.mockResolvedValue(product);

        const response = await request(app).get(`/products/${product._id}`);
        expect(response.status).toBe(200);
        expect(response.text).toContain(product.name);
    });

    it('should return a product by ID from dashboard', async () => {
        const product = {
            _id: '60c72b2f9b1d4c3f00123457',
            name: 'Test Product',
            description: 'Test Description',
            image: 'http://example.com/image.png',
            category: 'Test Category',
            size: 38,
            price: 20,
        };

        Product.findById.mockResolvedValue(product);

        const response = await request(app).get(`/dashboard/${product._id}`);
        expect(response.status).toBe(200);
        expect(response.text).toContain(product.name);
    });

    it('should return 404 if product does not exist in products', async () => {

        Product.findById.mockResolvedValue(null);

        const response = await request(app).get('/products/60c72b2f9b1d4c3f00123456');
        expect(response.status).toBe(404);
        expect(response.body).toHaveProperty('message', 'The product with the provided id does not exist');
    });

    it('should return 404 if product does not exist in dashboard', async () => {

        Product.findById.mockResolvedValue(null);

        const response = await request(app).get('/dashboard/60c72b2f9b1d4c3f00123456');
        expect(response.status).toBe(404);
        expect(response.body).toHaveProperty('message', 'The product with the provided id does not exist');
    });

    it('should return 500 if there is an error fetching products', async () => {
        Product.findById.mockRejectedValue(new Error('Database error')); 
    
        const response = await request(app).get('/products/60c72b2f9b1d4c3f00123457'); // Test the specific product route
    
        expect(response.status).toBe(500); // Check for internal server error status
        expect(response.body).toHaveProperty('message', "An error occurred while fetching the product"); // Check error message
      });
});


describe('PUT /dashboard/:id', () => {
    afterEach(() => {
        jest.clearAllMocks(); // Clear mocks between tests
      });
    it('should update an existing product', async () => {
        const product = {
            name: 'Test Product',
            description: 'Test Description',
            image: 'http://example.com/image.png',
            category: 'Test Category',
            size: 42,
            price: 20,
        };

        const updatedProduct = {
            name: 'Updated Product',
            description: 'Updated Description',
            image: 'http://example.com/image_updated.png',
            category: 'Updated Category',
            size: 44,
            price: 25,
        };

        Product.findByIdAndUpdate.mockResolvedValue(updatedProduct);

        const response = await request(app).put(`/dashboard/${product._id}`).send(updatedProduct);
        expect(response.status).toBe(200);
        expect(response.body).toHaveProperty('success', true);
        expect(response.body).toHaveProperty('redirectUrl', `/dashboard/${product._id}`);
    });

    it('should return 404 if product does not exist', async () => {

        Product.findByIdAndUpdate.mockResolvedValue(null);

        const response = await request(app).put('/dashboard/60c72b2f9b1d4c3f00123456').send({ name: 'New Name' });
        expect(response.status).toBe(404);
        expect(response.body).toHaveProperty('message', 'The product with the provided id does not exist');
    });
    it('should return 500 if there is an error updating products', async () => {
        Product.findByIdAndUpdate.mockRejectedValue(new Error('Database error')); 
    
        const response = await request(app).put('/dashboard/60c72b2f9b1d4c3f00123456'); 
    
        expect(response.status).toBe(500); // Check for internal server error status
        expect(response.body).toHaveProperty('message', "An error occurred while updating the product"); 
      });
});

describe('DELETE /dashboard/:id', () => {
    afterEach(() => {
        jest.clearAllMocks(); // Clear mocks between tests
      });
    it('should delete an existing product', async () => {
        const product = {
            _id: '60c72b2f9b1d4c3f00123456',
            name: 'Test Product',
            description: 'Test Description',
            image: 'http://example.com/image.png',
            category: 'Test Category',
            size: 46,
            price: 20,
        };

        Product.findById.mockResolvedValue(product);
        Product.findByIdAndDelete.mockResolvedValue(product);

        const response = await request(app).delete(`/dashboard/${product._id}?confirm=true`);
        expect(response.status).toBe(302);
        expect(Product.findById).toHaveBeenCalledWith(product._id);
        expect(Product.findByIdAndDelete).toHaveBeenCalledWith(product._id);
        expect(response.headers.location).toBe('/dashboard');
        expect(response.body).toHaveProperty('success', true);
        expect(response.body).toHaveProperty('message', `Product "${product.name}" has been successfully deleted.`);
    });

    it('should return 404 if product does not exist', async () => {


        
        Product.findById.mockResolvedValue(null);      
        Product.findByIdAndDelete.mockResolvedValue(null);

        const response = await request(app).delete(`/dashboard/60c72b2f9b1d4c3f00123456?confirm=true`);
        expect(response.status).toBe(404);
    });

    it('should return 500 if there is an error deleting a product', async () => {
      const product = {
        _id: '60c72b2f9b1d4c3f00123456',
        name: 'Test Product',
    };

        Product.findById.mockResolvedValue(product);
        Product.findByIdAndDelete.mockRejectedValue(new Error('Database error')); 
    
        const response = await request(app).delete(`/dashboard/${product._id}?confirm=true`); 
    
        expect(response.status).toBe(500); // Check for internal server error status
        expect(response.body).toHaveProperty('message', "An error occurred while deleting the product"); 
      });
});