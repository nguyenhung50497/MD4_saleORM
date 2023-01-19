import { Router } from 'express';
import userController from "../controller/UserController";

export const userRouter = Router();

userRouter.get('/change-pass', userController.showFormChangePassword);
userRouter.post('/change-pass', userController.changePassword);
userRouter.get('/login', userController.showFormLogin)
userRouter.post('/login', userController.login);
userRouter.get('/register', userController.showFormRegister)
userRouter.post('/register', userController.register);
userRouter.get('/logout', userController.logout);
userRouter.get('/cart', userController.showFormCart);
userRouter.get('/search-product', userController.searchProduct);
userRouter.get('/price-range', userController.priceRange);
userRouter.post('/order/:id', userController.orderProduct);
userRouter.post('/pay-order', userController.payOrder);