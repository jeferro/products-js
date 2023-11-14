let now = new Date()

db['users'].insertMany([
    {
        _id: "user",
        encryptedPassword: "$2b$10$MKb9mHN7DrnjJayo70KSOu2aZa0N71DaN0xMJa.Vxgck14dCqC7BG",
        roles: [
            'user'
        ],
        metadata: {
            createdBy: 'user',
            createdAt: now,
            updatedBy: 'user',
            updatedAt: now
        }
    }
])
