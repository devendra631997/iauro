const User = require("../../models/user")
require('dotenv').config();

const Product = require("../../models/product")
const seedProduct = [
    {
        name: "pr0",
        id: 31213,
        addedBy: 1,
    }, {
        name: "pr1",
        id: 3,
        addedBy: 2,
    }, {
        name: "pr2",
        id: 312,
        addedBy: 2,
    }, {
        name: "pr3",
        id: 39,
        addedBy: 1,
    }
];


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
    await User.deleteMany({});
    await User.insertMany(seedUser);
    await Product.deleteMany({});
    await Product.insertMany(seedProduct);
};


module.exports = { SeedUsers };
