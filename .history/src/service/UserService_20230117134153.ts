import { User } from "../model/user";
import { Cart } from "../model/cart";
import { Product } from "../model/product";
import { AppDataSource } from "../data-source";


class UserService {
    constructor() {
    }

    getAll = async () => {
        let users = await User.find();
        return users;
    }

    checkUser = async (username) => {
        let userCheck = await User.findOne({ username: username });
        if (!userCheck) {
            return null;
        }
        return userCheck;
    }

    checkUsername = async (user) => {
        let usernameCheck = await User.findOne({ username: user.username});
        if (!usernameCheck) {
            return null;
        }
        return usernameCheck;
    }

    registerUser = async (user) => {
        return await User.create(user);
    }

    findById = async (id) => {
        let user = await User.findOne({ _id: id });
        if (!user) {
            return null;
        }
        return user;
    }

    private changePassword = async (id, newPassword) => {
        let user = await User.findOne({ _id: id});
        if (!user) {
            return null;
        }
        return User.updateOne({_id: id}, {password: newPassword});
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
                await Cart.updateOne({_id: cart[i]._id}, {status: 'paid'})
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