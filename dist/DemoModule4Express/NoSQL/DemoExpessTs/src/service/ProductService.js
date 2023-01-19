"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const product_1 = require("../model/product");
class ProductService {
    constructor() {
        this.getAll = async () => {
            return product_1.Product.find();
        };
        this.save = async (product) => {
            return await product_1.Product.create(product);
        };
        this.deleteProduct = async (idDelete) => {
            let product = product_1.Product.findOne({ _id: idDelete });
            return product_1.Product.deleteOne(product);
        };
        this.update = async (idEdit, newProduct) => {
            let product = product_1.Product.findOne({ _id: idEdit });
            if (!product) {
                return null;
            }
            newProduct._id = idEdit;
            return product_1.Product.updateOne({ _id: idEdit }, newProduct);
        };
        this.findById = async (idEdit) => {
            return product_1.Product.findOne({ _id: idEdit });
        };
    }
}
exports.default = new ProductService();
//# sourceMappingURL=ProductService.js.map