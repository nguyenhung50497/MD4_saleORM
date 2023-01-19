"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.productRouter = void 0;
const express_1 = require("express");
const HomeController_1 = __importDefault(require("../controller/HomeController"));
exports.productRouter = (0, express_1.Router)();
exports.productRouter.get('/createProduct', HomeController_1.default.showFormCreate);
exports.productRouter.post('/create', HomeController_1.default.createProduct);
exports.productRouter.get('/update/:id', HomeController_1.default.showFormEdit);
exports.productRouter.post('/edit/:id', HomeController_1.default.updateProduct);
exports.productRouter.get('/delete/:id', HomeController_1.default.showFormDelete);
exports.productRouter.post('/delete/:id', HomeController_1.default.deleteProduct);
exports.productRouter.get('/detailp/:id', HomeController_1.default.showFormDetail);
exports.productRouter.post('/search/', HomeController_1.default.searchProduct);
//# sourceMappingURL=product-router.js.map