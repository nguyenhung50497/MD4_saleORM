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
        console.log();
        
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
        let sql = `SELECT * FROM product p JOIN category c ON p.category = c.idCategory WHERE name LIKE '%${name}%'`
        let products = await this.productRepository.query(sql);
        if (!products) {
            return null;
        }
        return products;
    }

    priceRange = async (value) => {
        let products;
        let sql;
        switch (value) {
            case 99:
                sql = `SELECT * FROM product p JOIN category c ON p.category = c.idCategory WHERE price BETWEEN 0 AND ${value}`
                products = await this.productRepository.query(sql);
                if (!products) {
                    return null;
                }
                return products;
            case 499:
                sql = `SELECT * FROM product p JOIN category c ON p.category = c.idCategory WHERE price BETWEEN 100 AND ${value}`
                products = await this.productRepository.query(sql);
                if (!products) {
                    return null;
                }
                return products;
            case 999:
                sql = `SELECT * FROM product p JOIN category c ON p.category = c.idCategory WHERE price BETWEEN 500 AND ${value}`
                products = await this.productRepository.query(sql);
                if (!products) {
                    return null;
                }
                return products;
            case 1999:
                sql = `SELECT * FROM product p JOIN category c ON p.category = c.idCategory WHERE price BETWEEN 1000 AND ${value}`
                products = await this.productRepository.query(sql);
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