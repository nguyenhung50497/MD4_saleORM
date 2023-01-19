declare class ProductService {
    private productRepository;
    private categoryRepository;
    constructor();
    getAll: () => Promise<any>;
    save: (product: any) => Promise<any>;
    private update;
    findById: (id: any) => Promise<any>;
    private remove;
    search: (name: any) => Promise<any>;
    priceRange: (value: any) => Promise<any>;
}
declare const _default: ProductService;
export default _default;
