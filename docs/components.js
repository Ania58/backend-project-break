module.exports = {
    components: {
        schemas: {
          Product: {
            type: 'object',
            properties: {
              _id: {
                type: 'string',
                description: 'Unique id for the product',
                example: '60d21b4667d0d8992e610c85'
              },
              name: {
                type: 'string',
                description: 'Name of the product',
                example: 'T-shirt'
              },
              description: {
                type: 'string',
                description: 'Description of the product',
                example: 'A comfortable cotton T-shirt'
              },
              image: {
                type: 'string',
                description: 'URL of the product image',
                example: 'https://example.com/image.jpg'
              },
              category: {
                type: 'string',
                description: 'Category of the product',
                example: 'Clothing'
              },
              size: {
                type: 'number',
                description: 'Size of the product',
                example: 42
              },
              price: {
                type: 'number',
                description: 'Price of the product',
                minimum: 0,
                example: 29.99
              },
              createdAt: {
                type: 'string',
                format: 'date-time',
                description: 'Timestamp when the product was created',
                example: '2024-09-28T12:00:00Z'
              },
              updatedAt: {
                type: 'string',
                format: 'date-time',
                description: 'Timestamp when the product was last updated',
                example: '2024-09-28T12:30:00Z'
              }
            },
            required: ['name', 'description', 'image', 'category', 'size', 'price']
          }
        }
      }
    };