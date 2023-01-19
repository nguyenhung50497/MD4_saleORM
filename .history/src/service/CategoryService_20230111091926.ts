import { Category } from "../model/category";

class CategoryService {
    constructor() {

    }

    getAll = async () => {
        let categories = await Category.find();
        return categories;
    }

}

export default new CategoryService();