"use strict";
exports.__esModule = true;
exports.Product = void 0;
var mongoose_1 = require("mongoose");
var ProductSchema = new mongoose_1.Schema({
    name: String,
    price: Number,
    image: String
});
var Product = (0, mongoose_1.model)('Product', ProductSchema);
exports.Product = Product;
