"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const user_1 = require("../model/user");
const cart_1 = require("../model/cart");
const data_source_1 = require("../data-source");
class UserService {
    constructor() {
        this.getAll = async () => {
            let users = await this.userRepository.find();
            return users;
        };
        this.checkUser = async (user) => {
            let userCheck = await this.userRepository.findOneBy({ username: user.username, password: user.password });
            if (!userCheck) {
                return null;
            }
            return userCheck;
        };
        this.checkUsername = async (user) => {
            let usernameCheck = await this.userRepository.findOneBy({ username: user.username });
            if (!usernameCheck) {
                return null;
            }
            return usernameCheck;
        };
        this.registerUser = async (user) => {
            return await this.userRepository.save(user);
        };
        this.findById = async (id) => {
            let user = await this.userRepository.findOneBy({ idUser: id });
            if (!user) {
                return null;
            }
            return user;
        };
        this.changePassword = async (id, newPassword) => {
            let user = await this.userRepository.findOneBy({ idUser: id });
            if (!user) {
                return null;
            }
            return this.userRepository.update({ idUser: id }, { password: newPassword });
        };
        this.orderProduct = async (quantity, product, user) => {
            let cartCheck = await this.cartRepository.findOneBy({ status: 'buying', user: user, product: product });
            if (!cartCheck) {
                let cart = {
                    status: 'buying',
                    quantity: quantity,
                    product: product,
                    user: user,
                };
                return await this.cartRepository.save(cart);
            }
            else {
                cartCheck.quantity += quantity;
                return this.cartRepository.update({ idCart: cartCheck.id }, { quantity: cartCheck.quantity });
            }
        };
        this.findCartByUser = async (user) => {
            let sql = `SELECT * FROM cart JOIN product ON cart.product = product.id WHERE user = ${user}`;
            let cart = await this.cartRepository.query(sql);
            if (!cart) {
                return null;
            }
            return cart;
        };
        this.changeStatusCart = async (user) => {
            let cart = await this.cartRepository.find({ user: user });
            if (!cart) {
                return null;
            }
            else {
                for (let i = 0; i < cart.length; i++) {
                    await this.cartRepository.update({ idCart: cart[i].idCart }, { status: 'paid' });
                }
                return 'success';
            }
        };
        this.removeCart = async (idCart) => {
            let product = await this.cartRepository.findOneBy({ idCart: idCart });
            if (!product) {
                return null;
            }
            return this.cartRepository.delete({ idCart: idCart });
        };
        this.userRepository = data_source_1.AppDataSource.getRepository(user_1.User);
        this.cartRepository = data_source_1.AppDataSource.getRepository(cart_1.Cart);
    }
}
exports.default = new UserService();
//# sourceMappingURL=UserService.js.map