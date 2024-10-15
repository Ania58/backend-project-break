module.exports = {
    paths: {
        "/": {
            get: {
                tags: ["Products"],
                description: "Get all products on the homepage",
                operationId: "getProductsOnHomePage",
                responses: {
                    200: {
                        description: "List of products",
                        content: {
                            "application/json": {
                                schema: {
                                    type: "array",
                                    items: {
                                        $ref: "#/components/schemas/Product",
                                    },
                                },
                            },
                        },
                    },
                    500: {
                        description: "Server error",
                    },
                },
            },
        },
        "/dashboard": {
            get: {
                tags: ["Products"],
                description: "Get all products on the dashboard",
                operationId: "getProductsOnDashboard",
                responses: {
                    200: {
                        description: "List of products",
                        content: {
                            "application/json": {
                                schema: {
                                    type: "array",
                                    items: {
                                        $ref: "#/components/schemas/Product",
                                    },
                                },
                            },
                        },
                    },
                    500: {
                        description: "Server error",
                    },
                },
            },
        },
        "/products/T-shirt": {
            get: {
                tags: ["Products"],
                description: "Get products by T-shirt category",
                operationId: "getProductsByTShirtCategory",
                responses: {
                    200: {
                        description: "List of T-shirts",
                        content: {
                            "application/json": {
                                schema: {
                                    type: "array",
                                    items: {
                                        $ref: "#/components/schemas/Product",
                                    },
                                },
                            },
                        },
                    },
                    500: {
                        description: "Server error",
                    },
                },
            },
        },
        "/products": {
            get: {
                tags: ["Products"],
                description: "Get all products",
                operationId: "getAllProducts",
                responses: {
                    200: {
                        description: "List of products",
                        content: {
                            "application/json": {
                                schema: {
                                    type: "array",
                                    items: {
                                        $ref: "#/components/schemas/Product",
                                    },
                                },
                            },
                        },
                    },
                    500: {
                        description: "Server error",
                    },
                },
            },
        },
        "/products/Trousers": {
            get: {
                tags: ["Products"],
                description: "Get products by Trousers category",
                operationId: "getProductsByTrousersCategory",
                responses: {
                    200: {
                        description: "List of Trousers",
                        content: {
                            "application/json": {
                                schema: {
                                    type: "array",
                                    items: {
                                        $ref: "#/components/schemas/Product",
                                    },
                                },
                            },
                        },
                    },
                    500: {
                        description: "Server error",
                    },
                },
            },
        },
        "/products/Shoes": {
            get: {
                tags: ["Products"],
                description: "Get products by Shoes category",
                operationId: "getProductsByShoesCategory",
                responses: {
                    200: {
                        description: "List of Shoes",
                        content: {
                            "application/json": {
                                schema: {
                                    type: "array",
                                    items: {
                                        $ref: "#/components/schemas/Product",
                                    },
                                },
                            },
                        },
                    },
                    500: {
                        description: "Server error",
                    },
                },
            },
        },
        "/products/Coats": {
            get: {
                tags: ["Products"],
                description: "Get products by Coats category",
                operationId: "getProductsByCoatsCategory",
                responses: {
                    200: {
                        description: "List of Coats",
                        content: {
                            "application/json": {
                                schema: {
                                    type: "array",
                                    items: {
                                        $ref: "#/components/schemas/Product",
                                    },
                                },
                            },
                        },
                    },
                    500: {
                        description: "Server error",
                    },
                },
            },
        },
        "/products/Sweaters": {
            get: {
                tags: ["Products"],
                description: "Get products by Sweaters category",
                operationId: "getProductsBySweatersCategory",
                responses: {
                    200: {
                        description: "List of Sweaters",
                        content: {
                            "application/json": {
                                schema: {
                                    type: "array",
                                    items: {
                                        $ref: "#/components/schemas/Product",
                                    },
                                },
                            },
                        },
                    },
                    500: {
                        description: "Server error",
                    },
                },
            },
        },
        "/products/{productId}": {
            get: {
                tags: ["Products"],
                description: "Get a specific product by ID",
                operationId: "getProductById",
                parameters: [
                    {
                        name: "productId",
                        in: "path",
                        required: true,
                        schema: {
                            type: "string",
                        },
                        description: "Product ID to retrieve",
                    },
                ],
                responses: {
                    200: {
                        description: "Product retrieved successfully",
                        content: {
                            "application/json": {
                                schema: {
                                    $ref: "#/components/schemas/Product",
                                },
                            },
                        },
                    },
                    500: {
                        description: "There was a problem finding the product with the requested ID",
                    },
                },
            },
        },
        "/dashboard/new": {
            get: {
                tags: ["Products"],
                description: "Show the new product form on the dashboard",
                operationId: "showNewProductForm",
                responses: {
                    200: {
                        description: "New product form displayed",
                    },
                    500: {
                        description: "Server error",
                    },
                },
            },
        },
        "/dashboard/{productId}": {
            get: {
                tags: ["Products"],
                description: "Get a specific product for the dashboard",
                operationId: "getProductForDashboard",
                parameters: [
                    {
                        name: "productId",
                        in: "path",
                        required: true,
                        schema: {
                            type: "string",
                        },
                        description: "Product ID to retrieve for dashboard",
                    },
                ],
                responses: {
                    200: {
                        description: "Product retrieved successfully for dashboard",
                        content: {
                            "application/json": {
                                schema: {
                                    $ref: "#/components/schemas/Product",
                                },
                            },
                        },
                    },
                    500: {
                        description: "There was a problem finding the product with the requested ID",
                    },
                },
            },
        },
        "/dashboard": {
            post: {
                tags: ["Products"],
                description: "Create a new product on the dashboard",
                operationId: "createProductOnDashboard",
                requestBody: {
                    content: {
                        "application/json": {
                            schema: {
                                $ref: "#/components/schemas/Product",
                            },
                        },
                    },
                },
                responses: {
                    201: {
                        description: "Product created successfully on dashboard",
                    },
                    500: {
                        description: "There was a problem trying to create a product on the dashboard",
                    },
                },
            },
        },
        "/dashboard/{productId}/edit": {
            get: {
                tags: ["Products"],
                description: "Show edit form for a specific product on the dashboard",
                operationId: "showEditProductForm",
                parameters: [
                    {
                        name: "productId",
                        in: "path",
                        required: true,
                        schema: {
                            type: "string",
                        },
                        description: "Product ID to edit",
                    },
                ],
                responses: {
                    200: {
                        description: "Edit form displayed for the product",
                    },
                    500: {
                        description: "Server error",
                    },
                },
            },
        },
        "/dashboard/{productId}": {
            put: {
                tags: ["Products"],
                description: "Update a specific product on the dashboard",
                operationId: "updateProductOnDashboard",
                parameters: [
                    {
                        name: "productId",
                        in: "path",
                        required: true,
                        schema: {
                            type: "string",
                        },
                        description: "Product ID to update",
                    },
                ],
                requestBody: {
                    content: {
                        "application/json": {
                            schema: {
                                type: "object",
                                properties: {
                                    name: {
                                        type: "string",
                                        description: "Updated product name",
                                        example: "New Product Name",
                                    },
                                    description: {
                                        type: "string",
                                        description: "Updated product description",
                                        example: "New Product Description",
                                    },
                                    category: {
                                        type: "string",
                                        description: "Updated product category",
                                        example: "Clothing",
                                    },
                                    image: {
                                        type: "string",
                                        description: "Updated product image URL",
                                        example: "https://example.com/image.jpg",
                                    },
                                    size: {
                                        type: "number",
                                        description: "Updated product size",
                                        example: 42,
                                    },
                                    price: {
                                        type: "number",
                                        description: "Updated product price",
                                        example: 25.99,
                                        minimum: 0,
                                        exclusiveMinimum: true, // This indicates the price must be greater than 0
                                    },  
                                },
                                required: ["name", "description", "image", "category", "size", "price"], 
                            },
                        },
                    },
                },
                responses: {
                    200: {
                        description: "Product updated successfully",
                    },
                    500: {
                        description: "There was a problem trying to update the product with the requested ID",
                    },
                },
            },
        },
        "/dashboard/{productId}/delete": {
            get: {
                tags: ["Products"],
                description: "Show delete confirmation for a specific product",
                operationId: "showDeleteProductConfirmation",
                parameters: [
                    {
                        name: "productId",
                        in: "path",
                        required: true,
                        schema: {
                            type: "string",
                        },
                        description: "Product ID to delete",
                    },
                ],
                responses: {
                    200: {
                        description: "Delete confirmation displayed for the product",
                    },
                    500: {
                        description: "Server error",
                    },
                },
            },
        },
        "/dashboard/{productId}/delete": {
            delete: {
                tags: ["Products"],
                description: "Delete a specific product on the dashboard",
                operationId: "deleteProductOnDashboard",
                parameters: [
                    {
                        name: "productId",
                        in: "path",
                        required: true,
                        schema: {
                            type: "string",
                        },
                        description: "Product ID to delete",
                    },
                ],
                responses: {
                    204: {
                        description: "Product deleted successfully",
                    },
                    500: {
                        description: "There was a problem trying to delete the product with the requested ID",
                    },
                },
            },
        },
    },
};