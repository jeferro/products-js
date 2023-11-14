let now = new Date()

db['users'].insertMany([
    {
        _id: "username",
        encryptedPassword: "$2b$10$MKb9mHN7DrnjJayo70KSOu2aZa0N71DaN0xMJa.Vxgck14dCqC7BG",
        roles: [
            'user'
        ],
        metadata: {
            createdBy: 'username',
            createdAt: now,
            updatedBy: 'username',
            updatedAt: now
        }
    }
])
