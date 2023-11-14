let now = new Date()

db['product-details'].insertMany([
    {
        _id: "one-product",
        title: "One product",
        description: "Description of one product",
        enabled: true,
        infoOcurredOn: now,
        activationOcurredOn: now,
        reviews: [
            {
                ownerId: 'user-one',
                comment: 'comment of the user one'
            },
            {
                ownerId: 'user-two',
                comment: 'comment of the user two'
            }
        ],
        metadata: {
            createdBy: 'user',
            createdAt: now,
            updatedBy: 'user',
            updatedAt: now
        }
    }
])
