declare class ProductService {
    constructor();
    getAll: () => Promise<(import("mongoose").Document<unknown, any, import("../model/product").IProduct> & import("../model/product").IProduct & {
        _id: import("mongoose").Types.ObjectId;
    })[]>;
    save: (product: any) => Promise<import("mongoose").Document<unknown, any, import("../model/product").IProduct> & import("../model/product").IProduct & {
        _id: import("mongoose").Types.ObjectId;
    }>;
    private update;
}
declare const _default: ProductService;
export default _default;
