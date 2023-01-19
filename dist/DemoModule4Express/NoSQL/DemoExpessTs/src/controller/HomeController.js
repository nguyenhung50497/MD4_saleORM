"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const ProductService_1 = __importDefault(require("../service/ProductService"));
class HomeController {
    constructor() {
        this.showHome = async (req, res) => {
            let products = await ProductService_1.default.getAll();
            res.render('home', { products: products });
        };
        this.showFormCreate = async (req, res) => {
            res.render('products/create');
        };
        this.create = async (req, res) => {
            if (req.files) {
                let image = req.files.image;
                if ("mv" in image) {
                    await image.mv('./public/storage/' + image.name);
                    let product = req.body;
                    product.image = '/storage/' + image.name;
                    await ProductService_1.default.save(product);
                    res.redirect(301, '/home');
                }
            }
        };
        this.remove = async (req, res) => {
            let idDelete = req.params.id;
            await ProductService_1.default.deleteProduct(idDelete);
            res.redirect(301, '/home');
        };
        this.showFormEdit = async (req, res) => {
            let idEdit = req.params.id;
            let product = await ProductService_1.default.findById(idEdit);
            res.render('products/edit', { product: product });
        };
        this.edit = async (req, res) => {
            let idEdit = req.params.id;
            await ProductService_1.default.update(idEdit, req.body);
            res.redirect(301, '/home');
        };
        this.productService = ProductService_1.default;
    }
}
exports.default = new HomeController();
//# sourceMappingURL=HomeController.js.map