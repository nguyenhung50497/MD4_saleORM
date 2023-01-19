import { User } from "../model/user";
import { Cart } from "../model/cart";
import { Product } from "../model/product";
import { AppDataSource } from "../data-source";

class UserService {
    private userRepository
    constructor() {
        this.userRepository = AppDataSource.getRepository(User);
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
        let user = await this.userRepository.findOneBy({ id: id });
        if (!user) {
            return null;
        }
        return user;
    }

    private changePassword = async (id, newPassword) => {
        let user = await this.userRepository.finBy({ id: id});
        if (!user) {
            return null;
        }
        return this.userRepository.update({id: id}, {password: newPassword});
    }

    private orderProduct = async (quantity, product, user) => {
        let cartCheck = await Cart.findOne({ status: 'buying', user: user, product: product});
        if (!cartCheck) {
            let cart = {
                status: 'buying',
                quantity: quantity,
                product: product,
                user: user,
            }
            return await Cart.create(cart);
        }
        else {
            cartCheck.quantity += quantity;
            return Cart.updateOne({_id: cartCheck._id}, {quantity: cartCheck.quantity});
        }
    }

    findCartByUser = async (user) => {
        let cart = await Cart.find({ user: user }).populate('product').populate('user');
        if (!cart) {
            return null;
        }
        return cart;
    }

    getAllCart = async () => {
        let cart = await Cart.find().populate('product').populate('user');
        return cart;
    }

    changeStatusCart = async (user) => {
        let cart = await Cart.find({ user: user }).populate('product').populate('user');
        if (!cart) {
            return null;
        }
        else {
            for (let i = 0; i < cart.length; i++) {
                await Cart.updateOne({id: cart[i].id}, {status: 'paid'})
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