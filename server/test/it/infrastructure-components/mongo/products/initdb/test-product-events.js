
db['product-events'].insertMany([
    {
        _id : "one-product::2023-10-29T09:00:00.028+0000",
        ocurredOn : new Date("2023-10-29T09:00:00.028+0000"),
        ocurredBy : "user",
        productId : "one-product",
        title: "title of product one",
        description: "description of product one",
        enabled: true,
        type : "ProductCreatedMongoDTO"
    },
    {
        _id : "one-product::2023-10-29T09:11:00.028+0000",
        ocurredOn : new Date("2023-10-29T09:11:00.028+0000"),
        ocurredBy : "user",
        productId : "one-product",
        title: "updated title of product one",
        description: "updated description of product one",
        type : "ProductUpdatedMongoDTO"
    },
    {
        _id : "one-product::2023-10-29T09:22:00.028+0000",
        ocurredOn : new Date("2023-10-29T09:22:00.028+0000"),
        ocurredBy : "user",
        productId : "one-product",
        enabled: false,
        type : "ProductActivationChangedMongoDTO"
    },
    {
        _id : "one-product::2023-10-29T09:44:00.028+0000",
        ocurredOn : new Date("2023-10-29T09:44:00.028+0000"),
        ocurredBy : "user",
        productId : "one-product",
        type : "ProductDeletedMongoDTO"
    }
])
