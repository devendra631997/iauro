const Product = require("../../models/product")
require('dotenv').config();
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
const SeedProducts = async () => {
    await Product.deleteMany({});
    await Product.insertMany(seedProduct);
};


module.exports = { SeedProducts };
