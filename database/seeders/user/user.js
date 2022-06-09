const User = require("../../models/user")
require('dotenv').config();
const seedUser = [
    {
        name: process.env.ADMIN_NAME,
        id: process.env.ADMIN_ID,
        email:process.env.ADMIN_EMAIL,
        isAdmin: true,
        password: process.env.ADMIN_PASS,
        phoneNumber: process.env.ADMIN_PHONE_NUMBER
    }
];
const SeedDB = async () => {
    await User.deleteMany({});
    await User.insertMany(seedUser);
};


module.exports = { SeedDB };
