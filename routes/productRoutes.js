const express = require("express");
const router = express.Router();
const Product = require("../models/Product.js"); 


router.get("/", async(req,res) => {
    try {
        const products = await Product.find(); 
        res.status(200).json(products);
    } catch (error) {
        console.error(error);
        res
            .status(500)
            .json({ message: "There was a problem trying to get all the products" });
    }
});

router.get("/dashboard", async(req,res) => { //for the admin, it has to be properly done later on
    try {
        const products = await Product.find(); 
        res.status(200).json(products);
    } catch (error) {
        console.error(error);
        res
            .status(500)
            .json({ message: "There was a problem trying to get all the products" });
    }
});


router.get("/dashboard/new", async(req,res) => { //for the admin, it has to be properly done later on
    try {
        const formHtml = `
        <!DOCTYPE html>
        <html lang="en">
        <head>
            <meta charset="UTF-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <title>Create New Product</title>
        </head>
        <body>
            <h1>Create a New Product</h1>
            <form action="/dashboard" method="POST">
                <label for="name">Name:</label>
                <input type="text" id="name" name="name" required><br>
    
                <label for="description">Description:</label>
                <textarea id="description" name="description" required></textarea><br>
    
                <label for="category">Category:</label>
                <input type="text" id="category" name="category" required><br>
    
                <label for="image">Image:</label>
                <input type="text" id="image" name="image" required><br>
    
                <label for="size">Size:</label>
                <input type="text" id="size" name="size" required><br>
    
                <label for="price">Price:</label>
                <input type="number" id="price" name="price" required><br>
    
                <button type="submit">Create Product</button>
            </form>
        </body>
        </html>
        `;
        res.send(formHtml);
    } catch (error) {
        console.error('Error loading the form:', error);
        res.status(500).json({ message: 'An error occurred while loading the form.' });
    }
});


router.post("/dashboard", async (req, res) => {
    try {
        const { name, description, category, image, size, price } = req.body;

        if (!name || !description || !category || !image || !size || !price) {
            return res.status(400).json({ message: "All fields are required" });
        }

        const product = await Product.create({
            name,
            description,
            category,
            image,  
            size,
            price,
        });

        res.status(201).json(product);
    } catch (error) {
        console.error('Error creating product:', error);
        res.status(500).json({ message: "There was a problem trying to create a product" });
    }
});


router.get("/products/:productId", async(req,res) => {
    try {
        const product = await Product.findById(req.params.productId);
        if (!product) {
            return res.status(404).json({ message: "The product with the provided id does not exist" })
        }
        res.status(200).json(product);
    } catch (error) {
        console.error(error);
        res
            .status(500)
            .json({ message: "An error occurred while fetching the product" });
    }
})


router.get("/dashboard/:productId", async(req,res) => { //for the admin, it has to be properly done later on
    try {
        const product = await Product.findById(req.params.productId);
        if (!product) {
            return res.status(404).json({ message: "The product with the provided id does not exist" })
        }
        res.status(200).json(product);
    } catch (error) {
        console.error(error);
        res
            .status(500)
            .json({ message: "An error occurred while fetching the product" });
    }
})

router.get("/dashboard/:productId/edit", async (req, res) => {
    try {
        const product = await Product.findById(req.params.productId);
        if (!product) {
            return res.status(404).json({ message: "The product with the provided id does not exist" });
        }
        const editFormHtml = `
            <!DOCTYPE html>
        <html lang="en">
        <head>
            <meta charset="UTF-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <title>Edit the Product</title>
        </head>
        <body>
            <h1>Edit a Product</h1>
            <form action="/dashboard" method="POST">
                <label for="name">Name:</label>
                <input type="text" id="name" name="name" required><br>
    
                <label for="description">Description:</label>
                <textarea id="description" name="description" required></textarea><br>
    
                <label for="category">Category:</label>
                <input type="text" id="category" name="category" required><br>
    
                <label for="image">Image:</label>
                <input type="text" id="image" name="image" required><br>
    
                <label for="size">Size:</label>
                <input type="text" id="size" name="size" required><br>
    
                <label for="price">Price:</label>
                <input type="number" id="price" name="price" required><br>
    
                <button type="submit">Edit Product</button>
            </form>
        </body>
        </html>
        `; 
        res.send(editFormHtml);
    } catch (error) {
        console.error('Error loading edit form:', error);
        res.status(500).json({ message: 'An error occurred while loading the edit form.' });
    }
});

router.put("/dashboard/:productId", async(req,res) => {
    try {
        const product = await Product.findByIdAndUpdate(req.params.productId, req.body, { new: true });
        if (!product) {
            return res.status(404).json({ message: "The product with the provided id does not exist" })
        }
        res.status(200).json(product);
    } catch (error) {
        console.error(error);
        res
            .status(500)
            .json({ message: "An error occurred while fetching the product" });
    }
})



router.delete("/dashboard/:productId/delete", async(req,res) => {
    try {
        const product = await Product.findByIdAndDelete(req.params.productId);
        if (!product) {
            return res.status(404).send({ message: "The product with the provided id does not exist" })
        }
        res.status(200).json(product);
    } catch (error) {
        console.error(error);
        res
            .status(500)
            .json({ message: "An error occurred while fetching the product" });
    }
})

module.exports = router;