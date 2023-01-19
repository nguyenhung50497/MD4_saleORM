"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const UserService_1 = __importDefault(require("../service/UserService"));
const ProductService_1 = __importDefault(require("../service/ProductService"));
const bcrypt_1 = __importDefault(require("bcrypt"));
class HomeController {
    constructor() {
        this.showFormLogin = async (req, res) => {
            let error = req.flash().error || [];
            res.render('users/login', { error: error });
        };
        this.login = async (req, res) => {
            let user = await this.userService.checkUsername(req.body);
            if (user) {
                let comparePass = await bcrypt_1.default.compare(req.body.password, user.password);
                if (comparePass) {
                    req.session.User = user.idUser;
                    if (user.role === 'admin') {
                        res.redirect(301, '/home-logined');
                    }
                    else {
                        res.redirect(301, '/home-customer');
                    }
                }
                else {
                    req.flash('error', 'Wrong password!!!');
                    res.redirect(301, '/users/login');
                }
            }
            else {
                req.flash('error', 'Wrong username!!!');
                res.redirect(301, '/users/login');
            }
        };
        this.showFormRegister = async (req, res) => {
            let error = req.flash().error || [];
            res.render('users/register', { error: error });
        };
        this.register = async (req, res) => {
            let username = await this.userService.checkUsername(req.body);
            if (username) {
                req.flash('error', "Username is already exist!!!");
                res.redirect(301, '/users/register');
            }
            else {
                let passwordHash = await bcrypt_1.default.hash(req.body.password, 10);
                let newUser = {
                    username: req.body.username,
                    password: passwordHash,
                    role: 'user',
                };
                await this.userService.registerUser(newUser);
                res.redirect(301, '/users/login');
            }
        };
        this.logout = async (req, res) => {
            await req.session.destroy((err) => {
                console.log('Destroyed');
                res.redirect(301, '/home');
            });
        };
        this.showFormChangePassword = async (req, res) => {
            if (req.session.User) {
                let error = req.flash().error || [];
                let user = await this.userService.findById(req.session.User);
                res.render('users/changePassword', { user: user, error: error });
            }
            else {
                res.redirect(301, '/users/login');
            }
        };
        this.changePassword = async (req, res) => {
            if (req.session.User) {
                let user = await this.userService.checkUser(req.body);
                let comparePass = await bcrypt_1.default.compare(req.body.password, req.body.newPassword);
                if (!user) {
                    req.flash('error', 'Old password is wrong!!!');
                    res.redirect(301, '/users/change-pass');
                }
                else if (comparePass) {
                    req.flash('error', "New password doesn't match!!!");
                    res.redirect(301, '/users/change-pass');
                }
                else {
                    let passwordHash = await bcrypt_1.default.hash(req.body.password, 10);
                    let newUser = await this.userService.changePassword(req.session.User, passwordHash);
                    await req.session.destroy((err) => {
                        res.redirect(301, '/users/login');
                    });
                }
            }
        };
        this.orderProduct = async (req, res) => {
            if (req.session.User) {
                let user = await this.userService.findById(req.session.User);
                let product = await ProductService_1.default.findById(req.params.id);
                let cart = await this.userService.orderProduct(+req.body.quantity, req.params.id, req.session.User);
                res.redirect(301, '/home-customer');
            }
            else {
                res.redirect(301, '/users/login');
            }
        };
        this.showFormCart = async (req, res) => {
            if (req.session.User) {
                let cart = await UserService_1.default.findCartByUser(req.session.User);
                let sum = 0;
                let paid = 0;
                for (let i = 0; i < cart.length; i++) {
                    let product = await ProductService_1.default.findById(cart[i].product);
                    if (cart[i].status === 'buying') {
                        sum += cart[i].quantity * product.price;
                    }
                    else {
                        paid += cart[i].quantity * product.price;
                    }
                }
                res.render('users/cart', { cart: cart, sum: sum, paid: paid });
            }
            else {
                res.redirect(301, '/users/login');
            }
        };
        this.searchProduct = async (req, res) => {
            let products = await ProductService_1.default.search(req.query.keyword);
            res.status(200).json(products);
        };
        this.payOrder = async (req, res) => {
            if (req.session.User) {
                await UserService_1.default.changeStatusCart(req.session.User);
                res.redirect(301, '/users/cart');
            }
            else {
                res.redirect(301, '/users/login');
            }
        };
        this.priceRange = async (req, res) => {
            let products = await ProductService_1.default.priceRange(+req.query.keyword);
            res.status(200).json(products);
        };
        this.deleteCart = async (req, res) => {
            if (req.session.User) {
                let id = req.params.id;
                await this.userService.removeCart(id);
                res.redirect(301, '/users/cart');
            }
            else {
                res.redirect(301, '/users/login');
            }
        };
        this.userService = UserService_1.default;
    }
}
exports.default = new HomeController();
//# sourceMappingURL=UserController.js.map