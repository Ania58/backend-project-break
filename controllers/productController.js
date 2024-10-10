const Product = require('../models/Product');

// Base HTML structure
const baseHtml = `<html><head><title>Web Store</title><link rel="stylesheet" href="/styles/styles.css"></head><body>`;

// Function to generate navigation bar
function getNavBar() {
    return `
        <nav>
            <ul>
                <li><a href="/products">Products</a></li>
                <li><a href="/products/T-shirt">T-shirts</a></li>
                <li><a href="/products/Trousers">Trousers</a></li>
                <li><a href="/products/Shoes">Shoes</a></li>
                <li><a href="/products/Coats">Coats</a></li>
                <li><a href="/products/Sweaters">Sweaters</a></li>
            </ul>
    </nav>`;
}

// Function to generate product cards HTML
function getProductCards(products, isDashboard) {
    let html = '<div class="product-container">';
    for (let product of products) {
        html += `
            <div class="product-card">
                <img src="${product.image}" alt="${product.name}">
                <h2>${product.name}</h2>
                 <a href="${isDashboard ? '/dashboard/' + product._id : '/products/' + product._id}">View Details</a>
            </div>
        `;
    }
    html += '</div>';
    return html;
}

// Show all products
const showProducts = async (req, res) => {
    try {
    const products = await Product.find();
    const isDashboard = req.url.includes('dashboard');
    const productCards = getProductCards(products, isDashboard);
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
        const isDashboard = req.url.includes('dashboard');
        const html = baseHtml + getNavBar() + `
        <div class="product-detail">
            <h1>${product.name}</h1>
            <img src="${product.image}" alt="${product.name}" class="product-image">
            <p class="description">${product.description}</p>
            <p class="price">${product.price}€</p>
            <p class="size">Size: ${product.size}</p>
            ${isDashboard ? `
                <div class="button-container">
                <a href="/dashboard/${product._id}/edit" class="button">Edit</a>
                <a href="/dashboard/${product._id}/delete" class="button">Delete</a></div>`: ''}
            </div>
        </body></html>`;
        res.send(html);
    } catch (error) {
        res.status(500).json({ message: "An error occurred while fetching the product" });
    }
};

// Show form to create a new product
const showNewProduct = (req, res) => {
    const html = baseHtml + getNavBar() + `
     <div class="new-product-form">
        <h1>Create New Product</h1>
        <form action="/dashboard" method="POST">
         <div class="form-group">
            <label>Name:</label>
            <input type="text" name="name" required><br>
        </div>
        <div class="form-group">
            <label>Description:</label>
            <textarea name="description" required></textarea><br>
        </div>
        <div class="form-group">
            <label>Category:</label>
            <select name="category" required>
                    <option value="" disabled selected>Select a category</option>
                    <option value="T-shirt">T-shirt</option>
                    <option value="Trousers">Trousers</option>
                    <option value="Shoes">Shoes</option>
                    <option value="Coats">Coats</option>
                    <option value="Sweaters">Sweaters</option>
                </select><br>
        </div>
        <div class="form-group">
            <label>Image URL:</label>
            <input type="text" name="image" required><br>
        </div>
        <div class="form-group">
            <label>Size:</label>
            <input type="text" name="size" required><br>
        </div>
        <div class="form-group">
            <label>Price:</label>
            <input type="number" name="price" min="0" required><br>
        </div>
            <button type="submit">Create Product</button>
        </form>
    </div>
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
        <div class="edit-product-form">
            <h1>Edit Product</h1>
            <form action="/dashboard/${product._id}" method="POST">
            <div class="form-group">
                <label for="name">Name:</label>
                <input type="text" name="name" value="${product.name}" required>
            </div>
            <div class="form-group">
                <label for="description">Description:</label>
                <textarea name="description" required>${product.description}</textarea>
            </div>
            <div class="form-group">
                <label for="category">Category:</label>
                <select name="category" value="${product.category}" required>
                    <option value="" disabled>Select a category</option>
                    <option value="T-shirt" ${product.category === 'T-shirt' ? 'selected' : ''}>T-shirt</option>
                    <option value="Trousers" ${product.category === 'Trousers' ? 'selected' : ''}>Trousers</option>
                    <option value="Shoes" ${product.category === 'Shoes' ? 'selected' : ''}>Shoes</option>
                    <option value="Coats" ${product.category === 'Coats' ? 'selected' : ''}>Coats</option>
                    <option value="Sweaters" ${product.category === 'Sweaters' ? 'selected' : ''}>Sweaters</option>
                </select><br>
            </div>
            <div class="form-group">
                <label for="image">Image URL:</label>
                <input type="text" name="image" value="${product.image}" required>
            </div>
            <div class="form-group">
                <label for="size">Size:</label>
                <input type="text" name="size" value="${product.size}" required>
            </div>
            <div class="form-group">
                <label for="price">Price:</label>
                <input type="number" name="price" value="${product.price}" required>
            </div>
             <div class="button-container">
                <button type="submit" id="submit-button">Update Product</button>
                 <a href="/dashboard" class="cancel-button">Cancel</a>
                </div>
            </form>
        </div>
        <script>
        document.getElementById('submit-button').addEventListener('click', async (event) => {
            event.preventDefault(); // Prevent default form submission

            const productId = '${req.params.productId}'; // Correctly reference productId
              const formData = {
                name: document.querySelector('input[name="name"]').value,
                description: document.querySelector('textarea[name="description"]').value,
                category: document.querySelector('select[name="category"]').value,
                image: document.querySelector('input[name="image"]').value,
                size: document.querySelector('input[name="size"]').value,
                price: document.querySelector('input[name="price"]').value
            };
            try {
                const response = await fetch(\`/dashboard/\${productId}\`, {
                    method: 'PUT',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(formData)
                });

                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }

                const data = await response.json();

                if (data.success) {
                    window.location.href = '/dashboard'; // Redirect after successful deletion
                } else {
                    console.log('Edition failed:', data.message);
                }
            } catch (error) {
                console.error('There was a problem with the fetch operation:', error);
            }
        });
        </script>
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
    const { confirm } = req.query; 
    try {
        const product = await Product.findById(req.params.productId);
        if (!product) {
            return res.status(404).json({ message: "The product with the provided id does not exist" });
        }

        if (confirm === 'true') {
            
            await Product.findByIdAndDelete(req.params.productId);
            

        if (req.headers['content-type'] === 'application/json') {
            return res.json({ success: true, message: `Product "${product.name}" has been successfully deleted.` });
        }

        // Return HTML with a deletion success message and auto-redirect
        const messageHtml = `
        <div class="message">
            <h1>Product "${product.name}" has been successfully deleted.</h1>
            <p>Redirecting to the dashboard...</p>
        </div>
        <script>
            setTimeout(() => {
                window.location.href = '/dashboard';
            }, 3000); // Redirect after 3 seconds
        </script>
        `;
        return res.send(baseHtml + getNavBar() + messageHtml);
        }

        // If 'confirm' is not true, show the confirmation page
        const html = baseHtml + getNavBar() + `
        <div class="delete-confirmation">
        <h1>Are you sure you want to delete "${product.name}"?</h1>
        <form action="/dashboard/${req.params.productId}/delete?confirm=true" method="POST">
            <button type="submit"  class="button" id="delete-button">Delete</button>
            <a href="/dashboard" class="cancel-button">Cancel</a>
        </form>
        </div>
        <script>
        document.getElementById('delete-button').addEventListener('click', async (event) => {
            event.preventDefault(); // Prevent default form submission

            const productId = '${req.params.productId}'; // Correctly reference productId
            try {
                const response = await fetch(\`/dashboard/\${productId}/delete?confirm=true\`, {
                    method: 'DELETE',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                });

                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }

                const data = await response.json();

                if (data.success) {
                    alert(data.message);  // Show success message
                    window.location.href = '/dashboard'; // Redirect after successful deletion
                } else {
                    console.log('Deletion failed:', data.message);
                }
            } catch (error) {
                console.error('There was a problem with the fetch operation:', error);
            }
        });
        </script>
        </body></html>`;
        return res.send(html);

    } catch (error) {
    res.status(500).json({ message: "An error occurred while deleting the product" });
    }
    };


const getProductsByCategory = async (req, res) => {
    try {
        ///products/T-shirt
        const category = req.path.split('/products/').join('') // /products/T-shirt => T-shirt

        const products = await Product.find({category}); 

        const productCards = getProductCards(products); 
        const html = baseHtml + getNavBar() + productCards + '</body></html>';
        res.send(html);
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