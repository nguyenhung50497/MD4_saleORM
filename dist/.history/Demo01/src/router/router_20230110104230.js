"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.router = void 0;
const express_1 = require("express");
const HomeController_1 = __importDefault(require("src/controller/HomeController"));
exports.router = (0, express_1.Router)();
exports.router.get('/home', HomeController_1.default.showHome);
//# sourceMappingURL=router_20230110104230.js.map