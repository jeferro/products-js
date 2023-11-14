
let now = new Date()

db['product-events'].insertMany([
    {
        "_id" : "one-product::2023-10-31T07:31:00.000Z",
        "ocurredOn" : ISODate("2023-10-31T07:31:00.000+0000"),
        "ocurredBy" : "user",
        "productId" : "one-product",
        "title": 'Title of the product one',
        "description": 'Description of the product one',
        "type" : "ProductCreatedMongoDTO"
    },
    {
        "_id" : "one-product::2023-10-31T07:32:00.000Z",
        "ocurredOn" : ISODate("2023-10-31T07:32:00.000+0000"),
        "ocurredBy" : "user",
        "productId" : "one-product",
        "enabled": false,
        "type" : "ProductActivationChangedMongoDTO"
    },
    {
        "_id" : "one-product::2023-10-31T07:33:00.000Z",
        "ocurredOn" : ISODate("2023-10-31T07:33:00.000+0000"),
        "ocurredBy" : "user",
        "productId" : "one-product",
        "type" : "ProductEnabledMongoDTO"
    }
])