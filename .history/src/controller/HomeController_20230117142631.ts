import { Request, Response } from "express";
import productService from '../service/ProductService';
import categoryService from '../service/CategoryService';

class HomeController {
    private productService;
    private categoryService;
    constructor() {
        this.productService = productService;
        this.categoryService = categoryService;
    }

    showHome = async (req: Request, res: Response) => {
        let products = await productService.getAll();
        res.render('home', { products: products });
    }

    test = async (req: Request, res: Response) => {
        let categories = await categoryService.getAll();
        res.render('products/create', {categories: categories});
    }

    showHomeLogined = async (req: Request, res: Response) => {
        console.log(req.session.User);
        if (req.session.User) {
            let products = await productService.getAll();
            res.render('homeLogined', { products: products });
        }
        else {
            res.redirect(301, '/users/login');
        }
    }

    showHomeCustomer = async (req: Request, res: Response) => {
        if (req.session.User) {
            let products = await productService.getAll();
            res.render('homeCustomer', { products: products });
        }
        else {
            res.redirect(301, '/users/login');
        }
    }

    showFormCreate = async (req: Request, res: Response) => {
        if (req.session.User) {
            console.log(2);
            let categories = await categoryService.getAll();
            res.render('products/create', {categories: categories});
        }
        else {
            res.redirect(301, '/users/login');
        }
    }

    createProduct = async (req: Request, res: Response) => {
        if (req.session.User) {
            if (req.files) {
                let image = req.files.image;
                if ('mv' in image) {
                    await image.mv('./public/storage/' + image.name);
                    let product = req.body;
                    product.image = '/storage/' + image.name;
                    await productService.save(product);
                    console.log('added product');
                    
                    res.redirect(301, '/home-logined');
                }
            }
        }
        else {
            res.redirect(301, '/users/login');
        }
    }
    
    showFormEdit = async (req: Request, res: Response) => {
        if (req.session.User) {
            let id = req.params.id;
            let product = await productService.findById(id);
            let categories = await categoryService.getAll();
            res.render('products/edit', {product: product, categories: categories});
        }
        else {
            res.redirect(301, '/users/login');
        }
    }

    updateProduct = async (req: Request, res: Response) => {
        if (req.session.User) {
            let id = req.params.id;
            if (req.files) {
                let image = req.files.image;
                if ('mv' in image) {
                    await image.mv('./public/storage/' + image.name);
                    let product = req.body;
                    product.image = '/storage/' + image.name;
                    await this.productService.update(id, product);
                    res.redirect(301, '/home-logined');
                }
            }
        }
        else {
            res.redirect(301, '/users/login');
        }
    }

    showFormDelete = async (req: Request, res: Response) => {
        if (req.session.User) {
            let idDelete = req.params.id;
            res.render('products/delete', {idDelete: idDelete});
        }
        else {
            res.redirect(301, '/users/login');
        }
    }

    deleteProduct = async (req: Request, res: Response) => {
        if (req.session.User) {
            let id = req.params.id;
            await this.productService.remove(id);
            res.redirect(301, '/home-logined');
        }
        else {
            res.redirect(301, '/users/login');
        }
    }

    showFormDetail = async (req: Request, res: Response) => {
        if (req.session.User) {
            let product = await productService.findById(req.params.id);
            res.render('products/detail', { product: product });
        }
        else {
            res.redirect(301, '/users/login');
        }
    }

    searchProduct = async (req: Request, res: Response) => {
        let products = await productService.search(req.body.search);
        res.render('homeCustomer', { products: products });
    }
}

export default new HomeController();