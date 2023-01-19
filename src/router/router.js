"use strict";
exports.__esModule = true;
exports.router = void 0;
var express_1 = require("express");
var HomeController_1 = require("../controller/HomeController");
var product_router_1 = require("./product-router");
exports.router = (0, express_1.Router)();
exports.router.get('/home', HomeController_1["default"].showHome);
exports.router.use('/products', product_router_1.productRouter);
