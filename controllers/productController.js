const Product = require('../models/Product');

// Base HTML structure
const baseHtml = `<html><head><title>Product Dashboard</title></head><body>`;

// Function to generate navigation bar
function getNavBar() {
    return `
        <nav>
            <ul>
                <li><a href="/products">Products</a></li>
                <li><a href="/products/tshirts">T-shirts</a></li>
                <li><a href="/products/trousers">Trousers</a></li>
                <li><a href="/products/shoes">Shoes</a></li>
                <li><a href="/products/coats">Coats</a></li>
            </ul>
    </nav>`;
}

// Function to generate product cards HTML
function getProductCards(products) {
    let html = '';
    for (let product of products) {
        html += `
            <div class="product-card">
                <img src="${product.image}" alt="${product.name}">
                <h2>${product.name}</h2>
                <p>${product.description}</p>
                <p>${product.price}€</p>
                <a href="/products/${product._id}">View Details</a>
                <a href="/dashboard/${product._id}/edit">Edit</a>
                <a href="/dashboard/${product._id}/delete">Delete</a>
            </div>
        `;
    }
    return html;
}

// Show all products
const showProducts = async (req, res) => {
    try {
    const products = await Product.find();
    const productCards = getProductCards(products);
    const html = baseHtml + getNavBar() + productCards + '</body></html>';
    res.send(html);
} catch (error) {
    res.status(500).json({ message: "There was an error fetching the products" });
}
};

// Show product by ID
const showProductById = async (req, res) => {
    try {
        const product = await Product.findById(req.params.productId);
        if (!product) {
            return res.status(404).json({ message: "The product with the provided id does not exist" });
        }
        const html = baseHtml + getNavBar() + `
            <h1>${product.name}</h1>
            <img src="${product.image}" alt="${product.name}">
            <p>${product.description}</p>
            <p>${product.price}€</p>
        </body></html>`;
        res.send(html);
    } catch (error) {
        res.status(500).json({ message: "An error occurred while fetching the product" });
    }
};

// Show form to create a new product
const showNewProduct = (req, res) => {
    const html = baseHtml + getNavBar() + `
        <h1>Create New Product</h1>
        <form action="/dashboard" method="POST">
            <label>Name:</label>
            <input type="text" name="name" required><br>
            <label>Description:</label>
            <textarea name="description" required></textarea><br>
            <label>Category:</label>
            <input type="text" name="category" required><br>
            <label>Image URL:</label>
            <input type="text" name="image" required><br>
            <label>Size:</label>
            <input type="text" name="size" required><br>
            <label>Price:</label>
            <input type="number" name="price" required><br>
            <button type="submit">Create Product</button>
        </form>
    </body></html>`;
    res.send(html);
};

// Create a new product
const createProduct = async (req, res) => {
    try {
        const { name, description, category, image, size, price } = req.body;
        if (!name || !description || !category || !image || !size || !price) {
            return res.status(400).json({ message: "All fields are required" });
        }
        const product = await Product.create({ name, description, category, image, size, price });
        res.redirect(`/products/${product._id}`); // Redirect to the new product detail page
    } catch (error) {
        console.error('Error creating product:', error);
        res.status(500).json({ message: "There was a problem trying to create a product" });
    }
};

// Show form to edit a product
const showEditProduct = async (req, res) => {
    try {
        const product = await Product.findById(req.params.productId);
        if (!product) {
            return res.status(404).json({ message: "The product with the provided id does not exist" });
        }
        const html = baseHtml + getNavBar() + `
            <h1>Edit Product</h1>
            <form action="/dashboard/${product._id}" method="POST">
                <input type="text" name="name" value="${product.name}" required>
                <textarea name="description" required>${product.description}</textarea>
                <input type="text" name="category" value="${product.category}" required>
                <input type="text" name="image" value="${product.image}" required>
                <input type="text" name="size" value="${product.size}" required>
                <input type="number" name="price" value="${product.price}" required>
                <button type="submit">Update Product</button>
            </form>
        </body></html>`;
        res.send(html);
    } catch (error) {
        console.error('Error loading edit form:', error);
        res.status(500).json({ message: 'An error occurred while loading the edit form.' });
    }
};

// Update a product
const updateProduct = async (req, res) => {
    try {
        const { name, description, category, image, size, price } = req.body;
        const product = await Product.findByIdAndUpdate(req.params.productId, { name, description, category, image, size, price }, { new: true });
        if (!product) {
            return res.status(404).json({ message: "The product with the provided id does not exist" })
        }
        res.redirect(`/products/${product._id}`);
    } catch (error) {
        res.status(500).json({ message: "An error occurred while updating the product" });
    }
};

// Delete a product
const deleteProduct = async (req, res) => {
    try {
        await Product.findByIdAndDelete(req.params.productId);
        if (!product) {
            return res.status(404).send({ message: "The product with the provided id does not exist" })
        }
        res.redirect('/dashboard');
    } catch (error) {
        res.status(500).json({ message: "An error occurred while deleting the product" });
    }
};

const getProductsByCategory = (category) => async (req, res) => {
    try {
        const products = await Product.find({ category }); 
        res.render('products', { products }); 
    } catch (error) {
        console.error('Error fetching products by category:', error);
        res.status(500).json({ message: "An error occurred while fetching products" });
    }
};

// Export your functions to use in routes
module.exports = {
    showProducts,
    showProductById,
    showNewProduct,
    createProduct,
    showEditProduct,
    updateProduct,
    deleteProduct,
    getProductsByCategory
};