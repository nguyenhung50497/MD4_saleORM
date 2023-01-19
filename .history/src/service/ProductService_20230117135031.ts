import { Product } from "../model/product";
import { Category } from "../model/category";
import { AppDataSource } from "../data-source";

class ProductService {
    private productRepository
    private categoryRepository
    constructor() {
        this.productRepository = AppDataSource.getRepository(Product);
        this.categoryRepository = AppDataSource.getRepository(Category);
    }

    getAll = async () => {
        let sql = `SELECT * FROM product p JOIN category c ON p.category = c.idCategory`
        let products = await this.productRepository.query(sql);
        return products;
    }

    save = async (product) => {
        return this.productRepository.save(product);
    }

    private update = async (id, newProduct) => {
        let product = await this.productRepository.findOneBy({id: id});
        if (!product) {
            return null;
        }
        return this.productRepository.update({id: id}, newProduct);
    }

    findById = async (id) => {
        let product = await this.productRepository.findOneBy({id: id});
        if (!product) {
            return null;
        }
        return product;
    }

    private remove = async (id) => {
        let product = await this.productRepository.findOneBy({id: id});
        if (!product) {
            return null;
        }
        return this.productRepository.delete({id: id});
    }

    search = async (name) => {
        let sql = "SELECT * FROM
        let products = await this.productRepository.find({ name: {$regex: name}});
        if (!products) {
            return null;
        }
        return products;
    }

    priceRange = async (start, end) => {
        let products = await this.productRepository.find({ $and: [{price: {$gte: start}}, {price: {$lte: end}}]});
        if (!products) {
            return null;
        }
        return products;
    }
    priceRange1 = async (value) => {
        let products;
        switch (value) {
            case 99:
                products = await this.productRepository.find({ $and: [{price: {$gte: 0}}, {price: {$lte: value}}]});
                if (!products) {
                    return null;
                }
                return products;
            case 499:
                products = await this.productRepository.find({ $and: [{price: {$gte: 100}}, {price: {$lte: value}}]});
                if (!products) {
                    return null;
                }
                return products;
            case 999:
                products = await this.productRepository.find({ $and: [{price: {$gte: 500}}, {price: {$lte: value}}]});
                if (!products) {
                    return null;
                }
                return products;
            case 1999:
                products = await this.productRepository.find({ $and: [{price: {$gte: 1000}}, {price: {$lte: value}}]});
                if (!products) {
                    return null;
                }
                return products;
            default:
                return products = await this.productRepository.find();
        }
    }
}

export default new ProductService();