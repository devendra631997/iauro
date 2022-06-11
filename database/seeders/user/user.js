const User = require("../../models/user")
require('dotenv').config();
const seedUser = [
    {
        name: process.env.ADMIN_NAME,
        id: process.env.ADMIN_ID,
        email: process.env.ADMIN_EMAIL,
        isAdmin: true,
        password: process.env.ADMIN_PASS,
        phoneNumber: process.env.ADMIN_PHONE_NUMBER
    }, {
        name: "user",
        id: 2,
        email: "user@user.com",
        isAdmin: false,
        password: 123456789,
        phoneNumber: 1234567890
    }
];
const SeedUsers = async () => {
    try {
        await User.deleteMany({});
        await User.insertMany(seedUser);
    } catch (error) {
        console.log(error)
    }
};


module.exports = { SeedUsers };
