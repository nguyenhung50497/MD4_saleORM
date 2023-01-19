"use strict";
exports.__esModule = true;
var express_1 = require("express");
var router_1 = require("./src/router/router");
var body_parser_1 = require("body-parser");
var express_fileupload_1 = require("express-fileupload");
var mongoose_1 = require("mongoose");
var app = (0, express_1["default"])();
mongoose_1["default"].set('strictQuery', true);
mongoose_1["default"].connect('mongodb://127.0.0.1:27017/demo01').then(function () {
    console.log('Connected to Mongo');
})["catch"](function (err) { return console.log(err); });
app.set('views', './src/views');
app.set('view engine', 'ejs');
app.use(express_1["default"].static('./public'));
app.use(body_parser_1["default"].json());
app.use(body_parser_1["default"].urlencoded({ extended: true }));
app.use((0, express_fileupload_1["default"])({
    createParentPath: true
}));
app.use('', router_1.router);
app.listen(3000, function () {
    console.log('Server is running on port 3000');
});
