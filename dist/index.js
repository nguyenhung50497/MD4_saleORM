"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const router_1 = require("./src/router/router");
const body_parser_1 = __importDefault(require("body-parser"));
const express_fileupload_1 = __importDefault(require("express-fileupload"));
const express_session_1 = __importDefault(require("express-session"));
const connect_flash_1 = __importDefault(require("connect-flash"));
const data_source_1 = require("./src/data-source");
const app = (0, express_1.default)();
data_source_1.AppDataSource.initialize().then(() => {
    console.log('database connected');
});
app.set('views', './src/views');
app.set('view engine', 'ejs');
app.use(express_1.default.static('./public'));
app.use(body_parser_1.default.json());
app.use(body_parser_1.default.urlencoded({ extended: true }));
app.use((0, express_fileupload_1.default)({
    createParentPath: true
}));
app.use((0, connect_flash_1.default)());
app.use((0, express_session_1.default)({
    resave: true,
    saveUninitialized: true,
    secret: 'somesecret',
    cookie: { maxAge: Infinity }
}));
app.use('', router_1.router);
app.listen(3000, () => {
    console.log('Server is running on port 3000');
});
//# sourceMappingURL=index.js.map