import { User } from "../model/user";
import { Cart } from "../model/cart";
import { Product } from "../model/product";
import { AppDataSource } from "../data-source";

class UserService {
    private userRepository;
    private cartRepository;
    constructor() {
        this.userRepository = AppDataSource.getRepository(User);
        this.cartRepository = AppDataSource.getRepository(Cart);
    }

    getAll = async () => {
        let users = await this.userRepository.find();
        return users;
    }

    checkUser = async (user) => {
        let userCheck = await this.userRepository.findOneBy({ username: user.username, password: user.password });
        if (!userCheck) {
            return null;
        }
        return userCheck;
    }

    checkUsername = async (user) => {
        let usernameCheck = await this.userRepository.findOneBy({ username: user.username});
        if (!usernameCheck) {
            return null;
        }
        return usernameCheck;
    }

    registerUser = async (user) => {
        return await this.userRepository.save(user);
    }

    findById = async (id) => {
        let user = await this.userRepository.findOneBy({ idUser: id });
        if (!user) {
            return null;
        }
        return user;
    }

    private changePassword = async (id, newPassword) => {
        let user = await this.userRepository.findOneBy({ idUser: id});
        if (!user) {
            return null;
        }
        return this.userRepository.update({idUser: id}, {password: newPassword});
    }

    private orderProduct = async (quantity, product, user) => {
        let cartCheck = await this.cartRepository.findOneBy({ status: 'buying', user: user, product: product});
        if (!cartCheck) {
            let cart = {
                status: 'buying',
                quantity: quantity,
                product: product,
                user: user,
            }
            return await this.cartRepository.save(cart);
        }
        else {
            cartCheck.quantity += quantity;
            return this.cartRepository.update({idCart: cartCheck.id}, {quantity: cartCheck.quantity});
        }
    }

    findCartByUser = async (user) => {
        let sql = `SELECT * FROM cart JOIN product ON cart.product = product.id WHERE user = ${user}`
        let cart = await this.cartRepository.find({ user: user }).populate('product').populate('user');
        if (!cart) {
            return null;
        }
        return cart;
    }

    getAllCart = async () => {
        let cart = await this.cartRepository.find().populate('product').populate('user');
        return cart;
    }

    changeStatusCart = async (user) => {
        let cart = await this.cartRepository.find({ user: user }).populate('product').populate('user');
        if (!cart) {
            return null;
        }
        else {
            for (let i = 0; i < cart.length; i++) {
                await this.cartRepository.update({idCart: cart[i].id}, {status: 'paid'})
            }
            return 'success';
        }
    }

    // totalMoney = async (user) => {
    //     let cart = await Cart.find({ user: user }).populate('product');
    //     let sum = 0;
    //     if (cart) {
    //         for (let i = 0; i < cart.length; i++) {
    //             let product = await Product.findById(cart[i].product);
    //             sum += cart[i].quantity * product.price;
    //         }
    //     }
    // }
}

export default new UserService();