"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const category_1 = require("../model/category");
const data_source_1 = require("../data-source");
class CategoryService {
    constructor() {
        this.getAll = async () => {
            let categories = await this.categoryRepository.find();
            return categories;
        };
        this.categoryRepository = data_source_1.AppDataSource.getRepository(category_1.Category);
    }
}
exports.default = new CategoryService();
//# sourceMappingURL=CategoryService.js.map