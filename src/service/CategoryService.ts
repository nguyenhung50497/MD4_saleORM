import { Category } from "../model/category";
import { AppDataSource } from "../data-source";

class CategoryService {
    private categoryRepository;
    constructor() {
        this.categoryRepository = AppDataSource.getRepository(Category);
    }

    getAll = async () => {
        let categories = await this.categoryRepository.find();
        return categories;
    }

}

export default new CategoryService();