"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const product_1 = require("../model/product");
const category_1 = require("../model/category");
const data_source_1 = require("../data-source");
class ProductService {
    constructor() {
        this.getAll = async () => {
            let sql = `SELECT * FROM product p JOIN category c ON p.category = c.idCategory`;
            let products = await this.productRepository.query(sql);
            return products;
        };
        this.save = async (product) => {
            return this.productRepository.save(product);
        };
        this.update = async (id, newProduct) => {
            let product = await this.productRepository.findOneBy({ id: id });
            if (!product) {
                return null;
            }
            return this.productRepository.update({ id: id }, newProduct);
        };
        this.findById = async (id) => {
            let product = await this.productRepository.findOneBy({ id: id });
            if (!product) {
                return null;
            }
            return product;
        };
        this.remove = async (id) => {
            let product = await this.productRepository.findOneBy({ id: id });
            if (!product) {
                return null;
            }
            return this.productRepository.delete({ id: id });
        };
        this.search = async (name) => {
            let sql = `SELECT * FROM product p JOIN category c ON p.category = c.idCategory WHERE name LIKE '%${name}%'`;
            let products = await this.productRepository.query(sql);
            if (!products) {
                return null;
            }
            return products;
        };
        this.priceRange = async (value) => {
            let products;
            let sql;
            switch (value) {
                case 99:
                    sql = `SELECT * FROM product p JOIN category c ON p.category = c.idCategory WHERE price BETWEEN 0 AND ${value}`;
                    products = await this.productRepository.query(sql);
                    if (!products) {
                        return null;
                    }
                    return products;
                case 499:
                    sql = `SELECT * FROM product p JOIN category c ON p.category = c.idCategory WHERE price BETWEEN 100 AND ${value}`;
                    products = await this.productRepository.query(sql);
                    if (!products) {
                        return null;
                    }
                    return products;
                case 999:
                    sql = `SELECT * FROM product p JOIN category c ON p.category = c.idCategory WHERE price BETWEEN 500 AND ${value}`;
                    products = await this.productRepository.query(sql);
                    if (!products) {
                        return null;
                    }
                    return products;
                case 1999:
                    sql = `SELECT * FROM product p JOIN category c ON p.category = c.idCategory WHERE price BETWEEN 1000 AND ${value}`;
                    products = await this.productRepository.query(sql);
                    if (!products) {
                        return null;
                    }
                    return products;
                default:
                    return products = await this.productRepository.find();
            }
        };
        this.productRepository = data_source_1.AppDataSource.getRepository(product_1.Product);
        this.categoryRepository = data_source_1.AppDataSource.getRepository(category_1.Category);
    }
}
exports.default = new ProductService();
//# sourceMappingURL=ProductService.js.map