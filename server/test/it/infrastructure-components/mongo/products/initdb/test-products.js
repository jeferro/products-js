let now = new Date()

db['products'].insertMany([
    {
        _id: "one-product",
        title: "One product",
        description: "Description of one product",
        enabled: true,
        metadata: {
            createdBy: 'user',
            createdAt: now,
            updatedBy: 'user',
            updatedAt: now
        }
    },
    {
        _id: "two-product",
        title: "Two product",
        description: "Description of two product",
        enabled: true,
        metadata: {
            createdBy: 'user',
            createdAt: now,
            updatedBy: 'user',
            updatedAt: now
        }
    },
    {
        _id: "disabled-product",
        title: "Disabled product",
        description: "Description of disabled product",
        enabled: false,
        metadata: {
            createdBy: 'user',
            createdAt: now,
            updatedBy: 'user',
            updatedAt: now
        }
    }
])
