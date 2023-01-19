"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.router = void 0;
const express_1 = require("express");
const HomeController_1 = __importDefault(require("../controller/HomeController"));
const UserController_1 = __importDefault(require("../controller/UserController"));
const product_router_1 = require("./product-router");
const user_router_1 = require("./user-router");
exports.router = (0, express_1.Router)();
exports.router.get('/home', HomeController_1.default.showHome);
exports.router.get('/home-logined', HomeController_1.default.showHomeLogined);
exports.router.get('/home-customer', HomeController_1.default.showHomeCustomer);
exports.router.post('/home-customer', UserController_1.default.priceRange);
exports.router.use('/products', product_router_1.productRouter);
exports.router.use('/users', user_router_1.userRouter);
//# sourceMappingURL=router.js.map