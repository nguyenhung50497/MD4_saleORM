"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.router = void 0;
const express_1 = require("express");
const HomeController_1 = __importDefault(require("../controller/HomeController"));
exports.router = (0, express_1.Router)();
exports.router.get('/home', HomeController_1.default.showHome);
exports.router.get('/products/create', HomeController_1.default.showFormCreate);
exports.router.post('/products/create', HomeController_1.default.createProduct);
//# sourceMappingURL=router.js.map